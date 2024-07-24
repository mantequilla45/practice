import React, { useState } from 'react';
import { getAuth, deleteUser } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { data, storage } from './firebase'; // Updated import for Firestore and Storage
import { Modal, Button } from 'react-bootstrap';

const DeleteAccount = ({ show, handleClose }) => {
  const [error, setError] = useState('');

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        await deleteDoc(doc(data, 'users', user.uid));

        const profileImageRef = ref(storage, 'profileImages/' + user.uid);
        await deleteObject(profileImageRef).catch((error) => {
          if (error.code !== 'storage/object-not-found') {
            throw error;
          }
        });

        await deleteUser(user);
        alert('Account deleted.');
        console.log('User account deleted.');
        window.location.href = '/landing';
      } catch (e) {
        setError('Error deleting account: ' + e.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        {error && <p className="error-message">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAccount;
