import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from './firebase';
import './ChangePassword.css';
import { wait } from '@testing-library/user-event/dist/utils';

const ChangePassword = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState(null);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setChangePasswordError('New password and confirm password do not match.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        alert('Password updated successfully.');
        onClose();
      }

    } catch (e) {
      console.error('Error updating password: ', e);
      if (e.code === 'auth/wrong-password') {
        setChangePasswordError('The current password is incorrect.');
      }
      else if (e.code === 'auth/too-many-requests'){
        setChangePasswordError('Temporarily disabled due to numerous attempts');
      }
      else {
        setChangePasswordError('Failed to update password. Please try again.');
      }
    }
  };

  return (
    <Modal 
      show={isOpen} 
      onHide={onClose}
      backdrop='static'
      keyboard={false}
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {changePasswordError && <p className="error-message">{changePasswordError}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleChangePassword}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePassword;
