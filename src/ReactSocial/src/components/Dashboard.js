import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [loginType, setLoginType] = useState('google');

  useEffect(() => {
    if (user) {
      setLoginType(user.type || 'google');
      
      if (user.type === 'username' || user.type === 'otp') {
        // Handle username/password or OTP login
        setProfile(user.data);
      } else if (user.type === 'google' && user.data.credential) {
        // Handle Google login
        try {
          const decoded = jwtDecode(user.data.credential);
          setProfile(decoded);
          console.log('User Profile:', decoded);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }
  }, [user]);

  if (!profile) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>✅ Successfully Authenticated!</h1>
          <div className="header-info">
            <span className="login-method-badge">
              {loginType === 'google' && '🌐 Google Login'}
              {loginType === 'username' && '🔐 Username/Password'}
              {loginType === 'otp' && '📧 Email OTP'}
            </span>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
        
        <div className="profile-section">
          <div className="profile-image">
            <img src={profile.picture} alt={profile.name} />
          </div>
          
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p className="email">{profile.email}</p>
            {profile.email_verified && (
              <span className="verified-badge">✓ Email Verified</span>
            )}
          </div>
        </div>

        <div className="details-section">
          <h3>Profile Details</h3>
          <div className="detail-grid">
            {loginType === 'google' && (
              <>
                <div className="detail-item">
                  <span className="detail-label">User ID:</span>
                  <span className="detail-value">{profile.sub}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Given Name:</span>
                  <span className="detail-value">{profile.given_name || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Family Name:</span>
                  <span className="detail-value">{profile.family_name || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Locale:</span>
                  <span className="detail-value">{profile.locale || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Token Issued At:</span>
                  <span className="detail-value">
                    {new Date(profile.iat * 1000).toLocaleString()}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Token Expires At:</span>
                  <span className="detail-value">
                    {new Date(profile.exp * 1000).toLocaleString()}
                  </span>
                </div>
              </>
            )}
            {loginType === 'username' && (
              <>
                <div className="detail-item">
                  <span className="detail-label">Username:</span>
                  <span className="detail-value">{profile.username}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{profile.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Login Method:</span>
                  <span className="detail-value">Username/Password</span>
                </div>
              </>
            )}
            {loginType === 'otp' && (
              <>
                <div className="detail-item">
                  <span className="detail-label">Username:</span>
                  <span className="detail-value">{profile.username}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{profile.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Login Method:</span>
                  <span className="detail-value">Email OTP Verification</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Verification:</span>
                  <span className="detail-value">✓ Email Verified</span>
                </div>
              </>
            )}
          </div>
        </div>

        {loginType === 'google' && user.data.credential && (
          <div className="token-section">
            <h3>JWT Token</h3>
            <div className="token-display">
              <code>{user.data.credential}</code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
