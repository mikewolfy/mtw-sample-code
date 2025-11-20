import React, { useState } from 'react';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest } from './authConfig';
import { AuthMethodSelector } from './components/AuthMethodSelector';
import { ProfileContent } from './components/ProfileContent';
import { IFrameLogin } from './components/IFrameLogin';
import { PopupIFrameLogin } from './components/PopupIFrameLogin';
import './App.css';

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showIFrameLogin, setShowIFrameLogin] = useState(false);
  const [showPopupIFrame, setShowPopupIFrame] = useState(false);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    
    if (method === 'popup') {
      // Use standard MSAL popup
      msalInstance.loginPopup(loginRequest).catch((e) => {
        console.error('Login error:', e);
      });
    } else if (method === 'iframe-embedded') {
      // Show embedded iframe
      setShowIFrameLogin(true);
    } else if (method === 'popup-iframe') {
      // Show popup with iframe
      setShowPopupIFrame(true);
    }
  };

  const handleCloseIFrame = () => {
    setShowIFrameLogin(false);
    setSelectedMethod(null);
  };

  const handleBackToSelector = () => {
    setSelectedMethod(null);
    setShowPopupIFrame(false);
  };

  return (
    <MsalProvider instance={msalInstance}>
      <div className="App">
        <AuthenticatedTemplate>
          <ProfileContent />
        </AuthenticatedTemplate>
        
        <UnauthenticatedTemplate>
          {!selectedMethod && !showPopupIFrame && (
            <AuthMethodSelector onMethodSelect={handleMethodSelect} />
          )}

          {showIFrameLogin && (
            <IFrameLogin onClose={handleCloseIFrame} />
          )}

          {showPopupIFrame && (
            <div className="popup-iframe-container">
              <button className="back-button" onClick={handleBackToSelector}>
                ← Back to Method Selection
              </button>
              <PopupIFrameLogin />
            </div>
          )}
        </UnauthenticatedTemplate>
      </div>
    </MsalProvider>
  );
}

export default App;
