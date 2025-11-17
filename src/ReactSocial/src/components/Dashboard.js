import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user && user.credential) {
      try {
        const decoded = jwtDecode(user.credential);
        setProfile(decoded);
        console.log('User Profile:', decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
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
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
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
          </div>
        </div>

        <div className="token-section">
          <h3>JWT Token (truncated)</h3>
          <div className="token-display">
            {/* <code>{user.credential.substring(0, 100)}...</code> */}
            <code>{user.credential}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
