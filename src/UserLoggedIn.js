// import React, { useEffect, useState } from 'react';
// import { signOut } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { auth, data } from './firebase';
// import './UserLoggedIn.css'; // You can create and style this CSS file
// import { useNavigate } from 'react-router-dom';

// const UserLoggedIn = ({ user }) => {
//   const [displayName, setDisplayName] = useState('');

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       let nameToDisplay = '';
//       if (user.displayName) {
//         // User logged in via third party with a display name
//         const firstName = user.displayName.split(' ')[0];
//         nameToDisplay = firstName;
//       } else {
//         // User logged in with email and password
//         const userDoc = await getDoc(doc(data, 'users', user.uid));
//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           nameToDisplay = userData.username || '';
//         }
//       }
//       setDisplayName(nameToDisplay);
//     };

//     fetchUserDetails();
//   }, [user]);

//   const handleLogOut = async () => {
//     try {
//       await signOut(auth);
//       console.log('User logged out'); // Debugging line
//     } catch (e) {
//       console.error('Error logging out: ', e);
//     }
//   };

//   const navigate = useNavigate();

//   const handleUserClick = () => {
//     console.log('User clicked');
//     navigate('/profile');
//   }

//   return (
//     <div className="user-info">
//       <span className="user-name" style={{fontWeight: 'bold'}} onClick={ handleUserClick }>{displayName || user.email}</span>
//       <button className="button" onClick={handleLogOut}>Log Out</button>
//     </div>
//   );
// };

// export default UserLoggedIn;

import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, data } from './firebase';
import './UserLoggedIn.css'; // Ensure this CSS file is styled appropriately
import { useNavigate } from 'react-router-dom';

const UserLoggedIn = ({ user }) => {
  const [displayName, setDisplayName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      let nameToDisplay = '';
      let profilePicUrl = '';

      if (user.displayName) {
        // User logged in via third party with a display name and possibly a photoURL
        const firstName = user.displayName.split(' ')[0];
        nameToDisplay = firstName;
        profilePicUrl = user.photoURL || ''; // Use photoURL if available
      } else {
        // User logged in with email and password
        const userDoc = await getDoc(doc(data, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          nameToDisplay = userData.username || '';
          profilePicUrl = userData.profilePicture || ''; // Assume profilePicture field exists
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
      console.log('User logged out'); // Debugging line
    } catch (e) {
      console.error('Error logging out: ', e);
    }
  };

  const placeholderImageUrl = 'https://clipground.com/images/user-icon-vector-png-6.png'; // Replace with the actual URL of your placeholder image

  const navigate = useNavigate();

  const handleUserClick = () => {
    console.log('User clicked');
    navigate('/profile');
  }

  return (
    <div className="user-info">
      <img 
        src={profilePicture || placeholderImageUrl} 
        alt="User Profile" 
        className="profile-picture" 
      />
      <span className="user-name" style={{fontWeight: 'bold'}} onClick={handleUserClick}>{displayName || user.email}</span>
      <button className="button" onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default UserLoggedIn;

