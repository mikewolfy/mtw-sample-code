import React from 'react';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import { SignInButton } from './components/SignInButton';
import { ProfileContent } from './components/ProfileContent';
import './App.css';

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <div className="App">
        <AuthenticatedTemplate>
          <ProfileContent />
        </AuthenticatedTemplate>
        
        <UnauthenticatedTemplate>
          <div className="login-container">
            <div className="login-card">
              <div className="logo-container">
                <div className="logo">🔐</div>
              </div>
              <h1>Azure B2C Authentication</h1>
              <p className="subtitle">
                Sign in to access your account using Azure Active Directory B2C
              </p>
              <SignInButton />
              <div className="info-section">
                <h3>What is Azure AD B2C?</h3>
                <p>
                  Azure Active Directory B2C is a customer identity access management (CIAM) 
                  solution that enables you to sign up and sign in users to your applications.
                </p>
              </div>
            </div>
          </div>
        </UnauthenticatedTemplate>
      </div>
    </MsalProvider>
  );
}

export default App;
