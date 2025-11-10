import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Get the Google Client ID from environment variable
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = (credentialResponse) => {
    setUser(credentialResponse);
  };

  const handleLogout = () => {
    setUser(null);
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
        {!user ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Dashboard user={user} onLogout={handleLogout} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
