import express from 'express';
import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  sendOtp,
  verifyOtp,
  changePassword,
  googleLogin,
  googleCallback,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getUserProfile);
router.put('/change-password', protect, changePassword);

// Google OAuth 2.0 routes
router.get('/google', googleLogin);
router.get('/callback/google', googleCallback);

export default router;
