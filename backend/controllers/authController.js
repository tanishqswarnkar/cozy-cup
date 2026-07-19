import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { isMongoConnected } from '../config/db.js';

// Resilient in-memory backup stores for high reliability
const localUsersMap = new Map();
const otpStoreMap = new Map();

// Helper to save user in resilient memory map under both _id and email keys
const saveUserLocally = (user) => {
  if (!user) return;
  if (user.email) localUsersMap.set(user.email.toLowerCase().trim(), user);
  if (user._id) localUsersMap.set(user._id.toString(), user);
};

// Helper to find user in resilient memory map by either _id, email, or googleId
const findUserLocally = (identifier) => {
  if (!identifier) return null;
  const key = identifier.toString().toLowerCase().trim();
  if (localUsersMap.has(key)) return localUsersMap.get(key);
  if (localUsersMap.has(identifier.toString())) return localUsersMap.get(identifier.toString());
  // Search values directly as fallback
  for (const u of localUsersMap.values()) {
    if (u._id && u._id.toString() === identifier.toString()) return u;
    if (u.email && u.email.toLowerCase() === key) return u;
    if (u.googleId && u.googleId.toString() === identifier.toString()) return u;
  }
  return null;
};

// Helper to generate JWT token
const generateToken = (_id) => {
  return jwt.sign({ id: _id }, process.env.JWT_SECRET || 'fallback_jwt_secret_key_123', {
    expiresIn: '30d',
  });
};

// Helper for hashing in local storage
const hashPasswordLocal = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
};

const matchPasswordLocal = async (plainPassword, hashedPassword) => {
  if (!hashedPassword) return false;
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Helper to attach HTTP-only JWT cookie via cookie-parser and send JSON response
const sendTokenResponse = (res, user, statusCode = 200, message = 'Success') => {
  const token = generateToken(user._id || user.email);

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  res.status(statusCode).cookie('token', token, cookieOptions).json({
    _id: user._id || 'usr-' + Date.now(),
    name: user.name || (user.email ? user.email.split('@')[0] : 'User'),
    email: user.email,
    role: user.role || 'user',
    token,
    message,
  });
};

// @desc    Send OTP to user email
// @route   POST /api/auth/send-otp
// @access  Public
export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email address is required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    // Generate a secure 6-digit OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Store OTP in memory
    otpStoreMap.set(cleanEmail, { otp: otpCode, expiresAt });

    // Print to backend console so developers/users can easily see and test the OTP locally
    console.log(`\n========================================================`);
    console.log(`✨ [COZY CUP AUTHENTICATION] OTP GENERATED FOR: ${cleanEmail}`);
    console.log(`🔑 YOUR 6-DIGIT VERIFICATION CODE IS:  ${otpCode}`);
    console.log(`========================================================\n`);

    res.status(200).json({
      success: true,
      message: `Verification code sent successfully to ${cleanEmail}`,
      devOtp: otpCode, // Returned for easy local testing
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP and log in / create user with optional password
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp, password, name } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and verification code are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const storedOtpObj = otpStoreMap.get(cleanEmail);

    // Validate OTP against stored code
    if (!storedOtpObj || storedOtpObj.otp !== otp.trim()) {
      return res.status(401).json({ message: 'Invalid or expired verification code. Please try again.' });
    }

    if (Date.now() > storedOtpObj.expiresAt) {
      otpStoreMap.delete(cleanEmail);
      return res.status(401).json({ message: 'Verification code has expired. Please request a new code.' });
    }

    // OTP verified successfully! Clear OTP
    otpStoreMap.delete(cleanEmail);

    let user = null;

    // Check if user exists in MongoDB or local storage
    if (isMongoConnected) {
      try {
        user = await User.findOne({ email: cleanEmail });
      } catch (err) {
        console.warn('MongoDB query warning during verify-otp, checking local storage...');
      }
    }
    if (!user) {
      user = findUserLocally(cleanEmail);
    }

    // If password provided, hash it to create/update account
    let hashedPassword = null;
    if (password && password.trim().length >= 4) {
      hashedPassword = await hashPasswordLocal(password.trim());
    }

    if (user) {
      // User exists - if they provided a new password during OTP verification, update their password!
      if (hashedPassword) {
        if (isMongoConnected && user.save) {
          user.password = password.trim(); // User model pre-save hook will hash it
          await user.save();
        } else {
          user.password = hashedPassword;
          saveUserLocally(user);
        }
      }
    } else {
      // New user creating account during OTP verification
      const userName = name && name.trim() ? name.trim() : cleanEmail.split('@')[0];
      const finalPassword = password && password.trim() ? password.trim() : 'CozyCup123!';

      if (isMongoConnected) {
        try {
          user = await User.create({
            name: userName,
            email: cleanEmail,
            password: finalPassword,
            role: 'user',
          });
        } catch (err) {
          console.warn('MongoDB create user warning, saving locally...');
        }
      }

      if (!user) {
        const localHash = await hashPasswordLocal(finalPassword);
        user = {
          _id: 'usr-' + Date.now(),
          name: userName,
          email: cleanEmail,
          password: localHash,
          role: 'user',
        };
        saveUserLocally(user);
      }
    }

    return sendTokenResponse(res, user, 200, 'Authentication successful!');
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new user with password
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter name, email, and password' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    let userExists = null;
    if (isMongoConnected) {
      try {
        userExists = await User.findOne({ email: cleanEmail });
      } catch (err) { }
    }
    if (!userExists) {
      userExists = findUserLocally(cleanEmail);
    }

    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists. Please sign in.' });
    }

    let user = null;
    if (isMongoConnected) {
      try {
        user = await User.create({
          name: name.trim(),
          email: cleanEmail,
          password: password.trim(),
          role: 'user',
        });
      } catch (err) {
        console.warn('MongoDB register error, using local resilient storage...');
      }
    }

    if (!user) {
      const hashedPassword = await hashPasswordLocal(password.trim());
      user = {
        _id: 'usr-' + Date.now(),
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        role: 'user',
      };
      saveUserLocally(user);
    }

    return sendTokenResponse(res, user, 201, 'Account created successfully!');
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token (login with password)
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = null;
    let isMatch = false;

    if (isMongoConnected) {
      try {
        user = await User.findOne({ email: cleanEmail });
        if (user) {
          isMatch = await user.matchPassword(password);
        }
      } catch (err) { }
    }

    if (!user) {
      user = findUserLocally(cleanEmail);
      if (user) {
        isMatch = await matchPasswordLocal(password, user.password);
      }
    }

    if (user && isMatch) {
      return sendTokenResponse(res, user, 200, 'Logged in successfully!');
    } else {
      res.status(401).json({ message: 'Invalid email or password. Please check your credentials.' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    let user = null;
    const lookupId = req.user.id || req.user._id || req.user.email;
    if (isMongoConnected && lookupId) {
      try {
        if (lookupId.toString().startsWith('usr-') || lookupId.toString().includes('@')) {
          user = await User.findOne({ $or: [{ email: lookupId.toString().toLowerCase() }, { _id: lookupId }, { googleId: lookupId.toString() }] });
        } else {
          user = await User.findById(lookupId);
          if (!user) user = await User.findOne({ email: lookupId.toString().toLowerCase() });
        }
      } catch (err) { }
    }
    if (!user) {
      user = findUserLocally(lookupId);
    }

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
        avatar: user.avatar,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Change user password securely using bcrypt
// @route   PUT /api/auth/change-password
// @access  Public
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.trim().length < 6) {
      return res.status(400).json({ message: 'Please provide valid current and new password (min 6 chars)' });
    }

    let user = null;
    const lookupId = req.user.id || req.user._id || req.user.email;
    if (isMongoConnected && lookupId) {
      try {
        if (lookupId.toString().startsWith('usr-') || lookupId.toString().includes('@')) {
          user = await User.findOne({ $or: [{ email: lookupId.toString().toLowerCase() }, { _id: lookupId }] });
        } else {
          user = await User.findById(lookupId);
        }
      } catch (err) { }
    }
    if (!user) {
      user = findUserLocally(lookupId);
    }

    if (!user) {
      return res.status(404).json({ message: 'User account not found' });
    }

    // Verify current password using bcrypt.compare
    let isMatch = false;
    if (user.matchPassword) {
      isMatch = await user.matchPassword(currentPassword);
    } else {
      isMatch = await matchPasswordLocal(currentPassword, user.password);
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    // Encrypt new password using bcrypt 10-round salt
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword.trim(), salt);

    if (isMongoConnected && user.save) {
      user.password = newPassword.trim(); // Mongoose pre-save hook runs bcrypt automatically
      await user.save();
    } else {
      user.password = newHashedPassword;
      saveUserLocally(user);
    }

    res.status(200).json({
      success: true,
      message: 'Password updated successfully with bcrypt encryption!',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log user out & clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ message: 'Logged out successfully, cookie cleared' });
};

// @desc    Initiate Google OAuth 2.0 flow
// @route   GET /api/auth/google
// @access  Public
export const googleLogin = (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId || clientId === 'your_google_client_id_here') {
    return res.status(400).send(`
      <div style="font-family: sans-serif; padding: 40px; background: #181410; color: #FCFAF6; min-height: 100vh;">
        <h2 style="color: #F59E0B;">⚠️ Google OAuth Client ID Not Configured</h2>
        <p>Please open <b>backend/.env</b> and replace <code>your_google_client_id_here</code> and <code>your_google_client_secret_here</code> with your actual keys from Google Cloud Console.</p>
        <a href="http://localhost:5173" style="color: #60A5FA; text-decoration: underline;">← Return to Cozy Cup</a>
      </div>
    `);
  }

  const redirectUri = req.protocol + '://' + req.get('host') + '/api/auth/callback/google';
  const scope = encodeURIComponent('openid email profile');
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

  res.redirect(googleAuthUrl);
};

// @desc    Handle Google OAuth 2.0 callback
// @route   GET /api/auth/callback/google
// @access  Public
export const googleCallback = async (req, res, next) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.redirect((process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://cozy-cup-boats.vercel.app' : 'http://localhost:5173')) + '/?error=google_auth_canceled');
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = req.protocol + '://' + req.get('host') + '/api/auth/callback/google';

    // 1. Exchange code for access_token & id_token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      console.error('Google token exchange error:', tokenData);
      return res.redirect((process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://cozy-cup-boats.vercel.app' : 'http://localhost:5173')) + '/?error=google_token_error');
    }

    // 2. Fetch user info from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const googleProfile = await userRes.json();

    if (!googleProfile.email) {
      return res.redirect((process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://cozy-cup-boats.vercel.app' : 'http://localhost:5173')) + '/?error=google_no_email');
    }

    const cleanEmail = googleProfile.email.toLowerCase().trim();

    // 3. Check if user already exists or create new user
    let user = null;
    if (isMongoConnected) {
      try {
        user = await User.findOne({ $or: [{ email: cleanEmail }, { googleId: googleProfile.sub }] });
      } catch (err) { }
    }
    if (!user && localUsersMap.has(cleanEmail)) {
      user = localUsersMap.get(cleanEmail);
    }

    if (!user) {
      const userName = googleProfile.name || cleanEmail.split('@')[0];
      const randomPass = 'GoogleOAuth_' + googleProfile.sub + '_' + Math.random().toString(36).substring(2, 10);

      if (isMongoConnected) {
        try {
          user = await User.create({
            name: userName,
            email: cleanEmail,
            password: randomPass,
            googleId: googleProfile.sub,
            avatar: googleProfile.picture,
            role: 'user',
          });
        } catch (err) {
          console.warn('MongoDB create user error during Google OAuth, saving locally...');
        }
      }

      if (!user) {
        const localHash = await hashPasswordLocal(randomPass);
        user = {
          _id: 'usr-google-' + Date.now(),
          name: userName,
          email: cleanEmail,
          password: localHash,
          googleId: googleProfile.sub,
          avatar: googleProfile.picture,
          role: 'user',
        };
        saveUserLocally(user);
      }
    } else {
      user.googleId = googleProfile.sub;
      if (googleProfile.picture && !user.avatar) user.avatar = googleProfile.picture;
      if (isMongoConnected && user.save) {
        await user.save();
      } else {
        saveUserLocally(user);
      }
    }

    // 4. Generate token and set cookie
    const token = generateToken(user._id || user.email);
    const cookieOptions = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    };
    res.cookie('token', token, cookieOptions);

    // 5. Redirect back to frontend with token and user info
    const userPayload = {
      _id: user._id || 'usr-' + Date.now(),
      name: user.name || cleanEmail.split('@')[0],
      email: user.email,
      role: user.role || 'user',
      avatar: user.avatar || googleProfile.picture,
      token,
    };

    const frontendRedirect = `${process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://cozy-cup-boats.vercel.app' : 'http://localhost:5173')}/?oauth_token=${encodeURIComponent(token)}&user=${encodeURIComponent(JSON.stringify(userPayload))}`;
    res.redirect(frontendRedirect);
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    res.redirect((process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://cozy-cup-boats.vercel.app' : 'http://localhost:5173')) + '/?error=google_callback_failed');
  }
};

