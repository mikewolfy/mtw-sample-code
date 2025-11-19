import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import './SignInButton.css';

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error('Login error:', e);
    });
  };

  return (
    <button className="signin-button" onClick={handleLogin}>
      Sign In with Azure B2C
    </button>
  );
};
