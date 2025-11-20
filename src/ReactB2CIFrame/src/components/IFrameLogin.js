import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { b2cPolicies, msalConfig } from '../authConfig';
import './IFrameLogin.css';

export const IFrameLogin = ({ onClose }) => {
  const { instance } = useMsal();
  const [iframeUrl, setIframeUrl] = useState('');
  const [authStatus, setAuthStatus] = useState('loading');

  useEffect(() => {
    // Construct the B2C login URL
    const authority = b2cPolicies.authorities.signUpSignIn.authority;
    const clientId = msalConfig.auth.clientId;
    const redirectUri = encodeURIComponent(window.location.origin);
    const scope = encodeURIComponent('openid profile');
    const responseType = 'id_token';
    const nonce = generateNonce();
    const state = generateState();

    // Store state for validation
    sessionStorage.setItem('auth_state', state);
    sessionStorage.setItem('auth_nonce', nonce);

    const loginUrl = `${authority}/oauth2/v2.0/authorize?` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `scope=${scope}&` +
      `response_type=${responseType}&` +
      `response_mode=fragment&` +
      `nonce=${nonce}&` +
      `state=${state}&` +
      `prompt=login&` +
      `ui_locales=en`;

    setIframeUrl(loginUrl);

    // Listen for messages from the iframe
    const handleMessage = (event) => {
      // Verify the origin matches your B2C domain
      if (event.origin.includes(b2cPolicies.authorityDomain) || 
          event.origin === window.location.origin) {
        
        if (event.data.type === 'auth_success') {
          setAuthStatus('success');
          // Handle the token
          handleAuthSuccess(event.data.token);
        } else if (event.data.type === 'auth_error') {
          setAuthStatus('error');
          console.error('Authentication error:', event.data.error);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [instance]);

  const generateNonce = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  const generateState = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  const handleAuthSuccess = (token) => {
    // Process the token and update MSAL cache
    console.log('Authentication successful');
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="iframe-login-container">
      <div className="iframe-login-modal">
        <div className="iframe-login-header">
          <h2>Sign In - Embedded View</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="iframe-wrapper">
          {authStatus === 'loading' && (
            <div className="iframe-content">
              <iframe
                src={iframeUrl}
                title="Azure B2C Login"
                className="auth-iframe"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
          )}
          {authStatus === 'success' && (
            <div className="auth-status success">
              <div className="status-icon">✓</div>
              <p>Authentication successful! Redirecting...</p>
            </div>
          )}
          {authStatus === 'error' && (
            <div className="auth-status error">
              <div className="status-icon">×</div>
              <p>Authentication failed. Please try again.</p>
              <button onClick={onClose}>Close</button>
            </div>
          )}
        </div>
        <div className="iframe-footer">
          <p className="iframe-note">
            <strong>Note:</strong> This authentication is embedded within the page using an iframe.
          </p>
        </div>
      </div>
    </div>
  );
};
