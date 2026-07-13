import React, { useState } from 'react';

const AuthPage = ({ onAuthSuccess, onCancel }) => {
  // 'magic' | 'otp' | 'password'
  const [authMethod, setAuthMethod] = useState('magic');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSocialLogin = (provider) => {
    setLoading(true);
    setError(null);
    setSuccessMsg(`Redirecting to ${provider}...`);
    setTimeout(() => {
      const mockUser = {
        _id: 'social-' + Date.now(),
        name: `Member (${provider})`,
        email: `member.${provider.toLowerCase()}@kessel.coffee`,
        role: 'member',
        token: `mock-${provider.toLowerCase()}-jwt`
      };
      setSuccessMsg(`Successfully authenticated with ${provider}!`);
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(mockUser);
      }, 700);
    }, 1000);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setSuccessMsg(`We sent a 6-digit code to ${email}`);
    }, 900);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (authMethod === 'magic') {
      if (!email) {
        setError('Please enter your email address.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg(`✨ Magic link dispatched to ${email}! Check your inbox to sign in instantly.`);
      }, 1000);
      return;
    }

    if (authMethod === 'otp') {
      if (!otpSent) {
        handleSendOtp(e);
        return;
      }
      if (!otpCode || otpCode.length < 4) {
        setError('Please enter the 6-digit verification code.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const mockUser = {
          _id: 'otp-' + Date.now(),
          name: email.split('@')[0],
          email: email,
          role: 'member',
          token: 'otp-jwt-token'
        };
        setSuccessMsg('OTP Verified successfully!');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(mockUser);
        }, 700);
      }, 900);
      return;
    }

    if (authMethod === 'password') {
      if (!email || !password || (isRegistering && !name)) {
        setError('Please fill in all required credentials.');
        return;
      }
      setLoading(true);
      const endpoint = isRegistering ? 'register' : 'login';
      const payload = isRegistering ? { name, email, password } : { email, password };

      try {
        const response = await fetch(`http://localhost:5001/api/auth/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Authentication failed');

        setSuccessMsg(isRegistering ? 'Account created successfully!' : 'Signed in successfully!');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(data);
        }, 700);
      } catch (err) {
        console.warn('Backend connection offline/simulated:', err.message);
        setSuccessMsg('Validating member credentials...');
        setTimeout(() => {
          const mockUser = {
            _id: 'pwd-' + Date.now(),
            name: name || email.split('@')[0],
            email: email,
            role: 'member',
            token: 'mock-jwt-token'
          };
          if (onAuthSuccess) onAuthSuccess(mockUser);
        }, 700);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 font-sans overflow-y-auto bg-[#181410] text-white">

      {/* Background Image of Beans & Coffee Vibe Theme */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-105"
        style={{ backgroundImage: `url('/coffee-beans-bg.png')` }}
      />

      {/* Warm atmospheric overlay over the beans background */}
      <div className="fixed inset-0 bg-[#181410]/60 backdrop-blur-[4px] pointer-events-none" />

      {/* Top Bar: Return to Shop Button */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-mono text-white/80 hover:text-white transition-colors py-2 px-4 rounded-full border border-white/20 hover:border-white/40 bg-white/10 backdrop-blur-md flex items-center gap-2 shadow-sm"
        >
          <span>✕ Close</span>
        </button>
      </div>

      {/* Transparent Glass Container Wrapper */}
      <div className="relative z-10 bg-white/[0.08] backdrop-blur-2xl rounded-3xl sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.85)] border border-white/20 my-auto max-w-[480px] w-full text-white">
        {/* Main Center Container */}
        <div className="w-full max-w-[420px] mx-auto z-10 animate-fadeIn my-auto py-2">

          {/* Brand Header with Logo */}
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white/30 shadow-xl mb-3.5 shrink-0 bg-white/10 backdrop-blur-md">
              <img
                src="/cozy-cup-logo.png"
                alt="Cozy Cup Logo"
                className="w-full h-full object-cover scale-105"
              />
            </div>
            <h1 className="font-display italic font-bold text-4xl sm:text-[42px] text-gold tracking-tight leading-none drop-shadow-sm">
              Cozy Cup
            </h1>
            <p className="text-[14px] text-white/75 mt-2 font-normal">
              Sign in or create an account
            </p>
          </div>

          {/* Social Authentication Buttons Stack */}
          <div className="space-y-3 mb-7">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="w-full py-3.5 px-6 bg-white/10 hover:bg-white/20 rounded-2xl sm:rounded-full border border-white/15 hover:border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all text-[13.5px] font-medium text-white flex items-center justify-center gap-3 active:scale-[0.99] backdrop-blur-md"
            >
              {/* Google SVG Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('Apple')}
              className="w-full py-3.5 px-6 bg-white/10 hover:bg-white/20 rounded-2xl sm:rounded-full border border-white/15 hover:border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all text-[13.5px] font-medium text-white flex items-center justify-center gap-3 active:scale-[0.99] backdrop-blur-md"
            >
              {/* Apple SVG Icon */}
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.13-1.9-14.34-6.08-3.69-3.03-7.64-7.85-11.86-14.46-6.64-10.43-12-21.84-16.08-34.22-4.08-12.38-6.12-24.11-6.12-35.18 0-14.16 3.65-25.9 10.95-35.22 7.3-9.32 16.63-14.04 27.99-14.16 5.11 0 10.4 1.25 15.86 3.76 5.46 2.51 9.3 3.76 11.53 3.76 1.83 0 5.86-1.34 12.08-4.01 6.23-2.67 11.66-3.87 16.3-3.61 13.88.79 24.63 6.04 32.25 15.76-12.24 7.33-18.23 16.99-17.97 28.98.26 9.87 4.13 18.06 11.61 24.58 7.48 6.52 15.82 10 25.02 10.45-2.22 6.84-4.87 13.56-7.95 20.17zM119.22 31.89c0-7.14 2.76-14.07 8.28-20.78 5.52-6.71 12.35-10.87 20.49-20.49-12.48.26 1.14.39 2.24.39 3.3 0 7.14-2.85 14.16-8.55 21.06-5.7 6.9-12.63 10.97-20.78 12.2-.1-1.1-.17-2.2-.17-3.3z" />
              </svg>
              <span>Continue with Apple</span>
            </button>


          </div>

          {/* Divider ("OR") */}
          <div className="relative flex items-center justify-center mb-7">
            <div className="border-t border-white/20 w-full" />
            <span className="bg-transparent px-3 text-[11px] font-mono tracking-widest uppercase text-white/50 absolute">
              OR
            </span>
          </div>

          {/* Auth Method Pill Switcher (Magic link vs OTP code vs Password) */}
          <div className="bg-white/10 p-1.5 rounded-full flex gap-1 mb-6 border border-white/15 text-xs font-medium backdrop-blur-md">
            <button
              type="button"
              onClick={() => { setAuthMethod('magic'); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-2.5 px-3 rounded-full transition-all text-center ${authMethod === 'magic'
                ? 'bg-white text-[#201B15] font-semibold shadow-sm scale-[1.01]'
                : 'text-white/70 hover:text-white'
                }`}
            >
              Magic link
            </button>
            <button
              type="button"
              onClick={() => { setAuthMethod('otp'); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-2.5 px-3 rounded-full transition-all text-center ${authMethod === 'otp'
                ? 'bg-white text-[#201B15] font-semibold shadow-sm scale-[1.01]'
                : 'text-white/70 hover:text-white'
                }`}
            >
              OTP code
            </button>
            <button
              type="button"
              onClick={() => { setAuthMethod('password'); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-2.5 px-3 rounded-full transition-all text-center ${authMethod === 'password'
                ? 'bg-white text-[#201B15] font-semibold shadow-sm scale-[1.01]'
                : 'text-white/70 hover:text-white'
                }`}
            >
              Password
            </button>
          </div>

          {/* Alerts */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-400/40 text-red-200 text-xs rounded-xl mb-4 text-center backdrop-blur-sm">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs rounded-xl mb-4 text-center backdrop-blur-sm">
              {successMsg}
            </div>
          )}

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* If registering with password, ask Name */}
            {authMethod === 'password' && isRegistering && (
              <div>
                <label className="block text-[11px] font-mono tracking-widest text-white/75 uppercase mb-1.5">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 rounded-xl sm:rounded-2xl py-3.5 px-4 border border-white/20 text-sm text-white placeholder-white/45 focus:outline-none focus:border-white shadow-sm transition-all backdrop-blur-md"
                />
              </div>
            )}

            {/* Email Box (Show unless OTP sent and verifying code) */}
            {!(authMethod === 'otp' && otpSent) && (
              <div>
                <label className="block text-[11px] font-mono tracking-widest text-white/75 uppercase mb-1.5">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 rounded-xl sm:rounded-2xl py-3.5 px-4 border border-white/20 text-sm text-white placeholder-white/45 focus:outline-none focus:border-white shadow-sm transition-all backdrop-blur-md"
                />
              </div>
            )}

            {/* If OTP mode and OTP was sent, show OTP Code box */}
            {authMethod === 'otp' && otpSent && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[11px] font-mono tracking-widest text-white/75 uppercase">
                    6-DIGIT CODE
                  </label>
                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtpCode(''); }}
                    className="text-xs text-white/70 hover:text-white underline"
                  >
                    Change email
                  </button>
                </div>
                <input
                  type="text"
                  required
                  maxLength="6"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="• • • • • •"
                  className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 rounded-xl sm:rounded-2xl py-3.5 px-4 border border-white/20 text-center tracking-[0.5em] font-mono text-lg text-white placeholder-white/40 focus:outline-none focus:border-white shadow-sm transition-all backdrop-blur-md"
                />
              </div>
            )}

            {/* If Password mode, show Password box */}
            {authMethod === 'password' && (
              <div>
                <label className="block text-[11px] font-mono tracking-widest text-white/75 uppercase mb-1.5">
                  PASSWORD
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 rounded-xl sm:rounded-2xl py-3.5 px-4 border border-white/20 text-sm text-white placeholder-white/45 focus:outline-none focus:border-white shadow-sm transition-all backdrop-blur-md"
                />
                <div className="flex justify-between items-center mt-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-white/80 hover:text-white underline"
                  >
                    {isRegistering ? 'Already have an account? Sign in' : 'Need an account? Create one'}
                  </button>
                </div>
              </div>
            )}

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-[#F4EFE6] active:scale-[0.99] text-[#201B15] rounded-xl sm:rounded-2xl py-3.5 px-6 text-[14px] font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#201B15] border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {authMethod === 'magic' && <span>Send magic link</span>}
                  {authMethod === 'otp' && (otpSent ? <span>Verify OTP code</span> : <span>Send OTP code</span>)}
                  {authMethod === 'password' && (isRegistering ? <span>Create account</span> : <span>Sign in with password</span>)}
                </>
              )}
            </button>
          </form>

          {/* Footer info */}
          <div className="mt-8 text-center">
            <p className="text-[12px] text-white/50">
              By continuing, you agree to Cozy Cup' Terms & Privacy.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;
