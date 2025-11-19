import React from 'react';
import { useMsal } from '@azure/msal-react';
import './SignOutButton.css';

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup({
      mainWindowRedirectUri: '/',
    }).catch((e) => {
      console.error('Logout error:', e);
    });
  };

  return (
    <button className="signout-button" onClick={handleLogout}>
      Sign Out
    </button>
  );
};
