import React, { useState, useEffect, useRef } from 'react';
import { useMsal } from '@azure/msal-react';
import { b2cPolicies, msalConfig } from '../authConfig';
import './PopupIFrameLogin.css';

export const PopupIFrameLogin = () => {
  const { instance } = useMsal();
  const [authStatus, setAuthStatus] = useState('loading');
  const popupRef = useRef(null);
  const checkIntervalRef = useRef(null);

  const generateNonce = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  const generateState = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  const handleAuthSuccess = (token) => {
    console.log('Authentication successful');
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  useEffect(() => {
    const openPopupWithIFrame = () => {
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

      // Create HTML content for the popup with an iframe
      const popupHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Sign In - Azure B2C</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                flex-direction: column;
                height: 100vh;
              }
              .header {
                background: white;
                padding: 16px 24px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .header h1 {
                font-size: 18px;
                color: #333;
                margin: 0;
              }
              .close-btn {
                background: #dc3545;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
              }
              .close-btn:hover {
                background: #c82333;
              }
              .iframe-container {
                flex: 1;
                background: white;
                margin: 16px;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              }
              iframe {
                width: 100%;
                height: 100%;
                border: none;
              }
              .footer {
                background: white;
                padding: 12px 24px;
                text-align: center;
                font-size: 12px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🔐 Azure B2C Authentication - Popup Window</h1>
              <button class="close-btn" onclick="window.close()">Close Window</button>
            </div>
            <div class="iframe-container">
              <iframe src="${loginUrl}" title="Azure B2C Login"></iframe>
            </div>
            <div class="footer">
              This is a popup window containing an embedded authentication iframe
            </div>
            <script>
              window.addEventListener('message', function(event) {
                if (event.data.type === 'auth_success' || event.data.type === 'auth_error') {
                  window.opener.postMessage(event.data, window.location.origin);
                  setTimeout(() => window.close(), 1000);
                }
              });
            </script>
          </body>
        </html>
      `;

      // Open popup window
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        '',
        'B2CLoginPopup',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
      );

      if (popup) {
        popup.document.write(popupHtml);
        popup.document.close();
        popupRef.current = popup;

        // Check if popup is closed
        checkIntervalRef.current = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkIntervalRef.current);
            setAuthStatus('closed');
          }
        }, 500);
      } else {
        setAuthStatus('blocked');
      }

      // Listen for messages from the popup
      const handleMessage = (event) => {
        if (event.origin === window.location.origin) {
          if (event.data.type === 'auth_success') {
            setAuthStatus('success');
            handleAuthSuccess(event.data.token);
          } else if (event.data.type === 'auth_error') {
            setAuthStatus('error');
            console.error('Authentication error:', event.data.error);
          }
        }
      };

      window.addEventListener('message', handleMessage);
    };

    openPopupWithIFrame();

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      if (popupRef.current && !popupRef.current.closed) {
        popupRef.current.close();
      }
    };
  }, [instance]);

  return (
    <div className="popup-iframe-status">
      {authStatus === 'loading' && (
        <div className="status-message">
          <div className="spinner"></div>
          <p>Opening authentication window...</p>
          <p className="status-note">Please complete the sign-in process in the popup window.</p>
        </div>
      )}
      {authStatus === 'success' && (
        <div className="status-message success">
          <div className="status-icon">✓</div>
          <p>Authentication successful!</p>
          <p className="status-note">Redirecting...</p>
        </div>
      )}
      {authStatus === 'error' && (
        <div className="status-message error">
          <div className="status-icon">×</div>
          <p>Authentication failed</p>
          <p className="status-note">Please try again.</p>
        </div>
      )}
      {authStatus === 'blocked' && (
        <div className="status-message error">
          <div className="status-icon">⚠</div>
          <p>Popup was blocked</p>
          <p className="status-note">Please allow popups for this site and try again.</p>
        </div>
      )}
      {authStatus === 'closed' && (
        <div className="status-message">
          <div className="status-icon">ℹ</div>
          <p>Authentication window closed</p>
          <p className="status-note">You can close this or try signing in again.</p>
        </div>
      )}
    </div>
  );
};
