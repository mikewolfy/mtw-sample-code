import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';

function Login({ onLoginSuccess }) {
  const handleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    onLoginSuccess(credentialResponse);
  };

  const handleError = () => {
    console.log('Login Failed');
    alert('Login failed. Please try again.');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔐 Welcome</h1>
          <p>Sign in with your Google account to continue</p>
        </div>
        <div className="login-body">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </div>
        <div className="login-footer">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
