import React from 'react';
import { useMsal } from '@azure/msal-react';
import { SignOutButton } from './SignOutButton';
import './ProfileContent.css';

export const ProfileContent = () => {
  const { accounts } = useMsal();
  const account = accounts[0];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Welcome!</h2>
          <SignOutButton />
        </div>
        
        <div className="profile-info">
          <h3>User Profile</h3>
          <div className="info-row">
            <span className="label">Name:</span>
            <span className="value">{account?.name || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="label">Username:</span>
            <span className="value">{account?.username || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="label">Account ID:</span>
            <span className="value">{account?.localAccountId || 'N/A'}</span>
          </div>
        </div>

        <div className="profile-claims">
          <h3>ID Token Claims</h3>
          <pre className="claims-content">
            {JSON.stringify(account?.idTokenClaims, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
