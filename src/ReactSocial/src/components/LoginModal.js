import React from 'react';
import Login from './Login';
import './LoginModal.css';

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <Login onLoginSuccess={onLoginSuccess} isModal={true} />
      </div>
    </div>
  );
}

export default LoginModal;
