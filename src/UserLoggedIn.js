import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import './UserLoggedIn.css'; // You can create and style this CSS file

const UserLoggedIn = ({ user }) => {
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      console.log('User logged out'); // Debugging line
    } catch (e) {
      console.error('Error logging out: ', e);
    }
  };

  return (
    <div className="user-info">
      <span className="user-name">{user.username || user.email}</span>
      <button className="button" onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default UserLoggedIn;
