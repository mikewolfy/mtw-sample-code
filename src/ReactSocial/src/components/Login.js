import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';

function Login({ onLoginSuccess, isModal = false }) {
  const [loginMode, setLoginMode] = useState('password'); // 'password' or 'otp'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    onLoginSuccess({
      type: 'google',
      data: credentialResponse
    });
  };

  const handleGoogleError = () => {
    console.log('Google Login Failed');
    alert('Google login failed. Please try again.');
  };

  const handleUsernamePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    // Simulate login (in real app, this would call an API)
    console.log('Username/Password Login:', { username, password });
    
    // Create a mock user object
    onLoginSuccess({
      type: 'username',
      data: {
        username: username,
        email: `${username}@example.com`,
        name: username,
        picture: `https://ui-avatars.com/api/?name=${username}&background=4285f4&color=fff&size=200`
      }
    });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    
    // Simulate sending OTP (in real app, this would call an API)
    console.log('OTP sent to:', email);
    console.log('Generated OTP:', otp); // In production, this would be sent via email
    
    // Show the OTP to user for demo purposes
    alert(`Demo Mode: Your OTP is ${otp}\n\nIn production, this would be sent to ${email}`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    
    if (!otp) {
      alert('Please enter the OTP');
      return;
    }

    // Verify OTP
    if (otp === generatedOtp) {
      console.log('OTP Login Success:', { email });
      
      // Extract username from email
      const username = email.split('@')[0];
      
      // Create a mock user object
      onLoginSuccess({
        type: 'otp',
        data: {
          username: username,
          email: email,
          name: username,
          picture: `https://ui-avatars.com/api/?name=${username}&background=34a853&color=fff&size=200`
        }
      });
    } else {
      alert('Invalid OTP. Please try again.');
      setOtp('');
    }
  };

  const handleResendOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    console.log('New OTP sent to:', email);
    console.log('Generated OTP:', otp);
    alert(`Demo Mode: Your new OTP is ${otp}\n\nIn production, this would be sent to ${email}`);
  };

  const handleSwitchMode = (mode) => {
    setLoginMode(mode);
    setOtpSent(false);
    setOtp('');
    setGeneratedOtp('');
  };

  return (
    <div className={`login-container ${isModal ? 'modal-version' : ''}`}>
      <div className="login-card">
        <div className="login-header">
          <h1>🔐 Welcome</h1>
          <p>Sign in to continue</p>
        </div>
        
        <div className="login-body">
          {/* Login Mode Tabs */}
          <div className="login-tabs">
            <button
              type="button"
              className={`tab-btn ${loginMode === 'password' ? 'active' : ''}`}
              onClick={() => handleSwitchMode('password')}
            >
              🔑 Password
            </button>
            <button
              type="button"
              className={`tab-btn ${loginMode === 'otp' ? 'active' : ''}`}
              onClick={() => handleSwitchMode('otp')}
            >
              📧 Email OTP
            </button>
          </div>

          {/* Username/Password Form */}
          {loginMode === 'password' && (
            <form className="credentials-form" onSubmit={handleUsernamePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username or Email</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="form-input"
                />
              </div>
              
              <button type="submit" className="submit-btn">
                Sign In
              </button>
            </form>
          )}

          {/* Email OTP Form */}
          {loginMode === 'otp' && !otpSent && (
            <form className="credentials-form" onSubmit={handleSendOtp}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="form-input"
                />
              </div>
              
              <button type="submit" className="submit-btn otp-btn">
                Send OTP
              </button>
              
              <p className="otp-info">
                📧 We'll send a one-time password to your email
              </p>
            </form>
          )}

          {/* OTP Verification Form */}
          {loginMode === 'otp' && otpSent && (
            <form className="credentials-form" onSubmit={handleVerifyOtp}>
              <div className="otp-sent-notice">
                <span className="success-icon">✓</span>
                <p>OTP sent to <strong>{email}</strong></p>
              </div>
              
              <div className="form-group">
                <label htmlFor="otp">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="form-input otp-input"
                  maxLength="6"
                  pattern="[0-9]{6}"
                />
              </div>
              
              <button type="submit" className="submit-btn">
                Verify & Sign In
              </button>
              
              <div className="otp-actions">
                <button 
                  type="button" 
                  className="link-btn"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </button>
                <button 
                  type="button" 
                  className="link-btn"
                  onClick={() => setOtpSent(false)}
                >
                  Change Email
                </button>
              </div>
            </form>
          )}

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Google Login */}
          <div className="social-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
              width="100%"
            />
          </div>
        </div>
        
        <div className="login-footer">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
