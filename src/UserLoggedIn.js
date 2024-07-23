import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, data } from './firebase';
import './UserLoggedIn.css';
import { useNavigate } from 'react-router-dom';

const UserLoggedIn = ({ user }) => {
  const [displayName, setDisplayName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      let nameToDisplay = '';
      let profilePicUrl = '';

      if (user.displayName) {
        const firstName = user.displayName.split(' ')[0];
        nameToDisplay = firstName;
        profilePicUrl = user.photoURL || '';
      } else {
        const userDoc = await getDoc(doc(data, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          nameToDisplay = userData.username || '';
          profilePicUrl = userData.profileImageUrl || '';
        }
      }

      setDisplayName(nameToDisplay);
      setProfilePicture(profilePicUrl);
    };

    fetchUserDetails();
  }, [user]);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate('/cure');
      console.log('User logged out');
    } catch (e) {
      console.error('Error logging out: ', e);
    }
  };

  const placeholderImageUrl = 'https://clipground.com/images/user-icon-vector-png-6.png';

  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/profile');
  }

  return (
    <div className="user-info">
      <div className="user-profile-container" onClick={handleUserClick}>
        <img 
          src={profilePicture || placeholderImageUrl} 
          alt="User Profile" 
          className="profile-picture" 
        />
        <span className="user-name" style={{fontWeight: 'bold', color: 'black'}} onClick={handleUserClick}>{displayName}</span>
      </div>
      <button className="button" onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default UserLoggedIn;
