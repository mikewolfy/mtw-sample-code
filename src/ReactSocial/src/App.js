import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import LoginModal from './components/LoginModal';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [displayMode, setDisplayMode] = useState('landing'); // 'landing', 'inline', 'popup'
  const [showModal, setShowModal] = useState(false);

  // Get the Google Client ID from environment variable
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = (loginResponse) => {
    console.log('Login response:', loginResponse);
    setUser(loginResponse);
    setShowModal(false);
    setDisplayMode('authenticated');
  };

  const handleLogout = () => {
    setUser(null);
    setDisplayMode('landing');
  };

  const handleShowPopupLogin = () => {
    setShowModal(true);
  };

  const handleShowInlineLogin = () => {
    setDisplayMode('inline');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!clientId) {
    return (
      <div className="App">
        <div className="error-container">
          <h1>⚠️ Configuration Error</h1>
          <p>Google Client ID is not configured.</p>
          <p>Please check the README.md for setup instructions.</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        {displayMode === 'landing' && !user && (
          <LandingPage 
            onShowPopupLogin={handleShowPopupLogin}
            onShowInlineLogin={handleShowInlineLogin}
          />
        )}
        
        {displayMode === 'inline' && !user && (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
        
        {user && (
          <Dashboard user={user} onLogout={handleLogout} />
        )}

        <LoginModal 
          isOpen={showModal}
          onClose={handleCloseModal}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
