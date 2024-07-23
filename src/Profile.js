import React, { useState, useEffect } from 'react';
import './Profile.css';
import Header from './Header';
import { data, storage, auth } from './firebase';  // Updated import for Firestore, Storage, and Auth
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    //const user = auth.currentUser;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // const userId = user.uid;
        setEmail(user.email);
        fetchUserProfile();
      } else {
        // User is signed out
        // Handle user not signed in case
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async () => {
    const user = auth.currentUser;
    try {
      const userDocRef = doc(data, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setPhone(userData.phone || '');
        setGender(userData.gender || '');
        setProfileImageUrl(userData.profileImageUrl || '');
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(data, 'users', userId);
        
        //update if nachange ang user pic
        if (profileImage) {
          const profileImageRef = ref(storage, 'profileImages/' + user.uid);
          await uploadBytes(profileImageRef, profileImage);
          const imageUrl = await getDownloadURL(profileImageRef);
          await updateDoc(userDocRef, { profileImageUrl: imageUrl });
          setProfileImageUrl(imageUrl);
        };

        //other info
        await updateDoc(userDocRef, {
          firstName,
          lastName,
          phone,
          gender
        });

        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(storage, 'profileImages/' + auth.currentUser.uid);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setProfileImageUrl(downloadURL);
      await updateDoc(doc(data, 'users', auth.currentUser.uid), { profileImageUrl: downloadURL });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateDoc(doc(data, 'users', auth.currentUser.uid), {
        firstName,
        lastName,
        phone,
        gender,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteAccount = async ()=> {
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

        await user.delete();
        window.location.href = '/landing';
      } catch (e) {
        console.error('Error deleting account:', e);
        alert('Failed to delete account. Please try again.');
      }
    }
  }

  const openDeleteConfirm = () => {
    setIsDeleteConfirmOpen(true);
  };
  
  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
  };

  const DeleteConfirmPopup = ({ onDeleteConfirm }) => {
    <div className="delete-confirm-popup">
    <div className="delete-confirm-content">
      <h2>Are you sure you want to delete your account?</h2>
      <p>This action cannot be undone.</p>
      <div className="button-container">
        <button className="confirm-delete" onClick={onDeleteConfirm}>Yes, Delete</button>
        <button className="cancel-delete" >Cancel</button>
      </div>
    </div>
  </div>
  }

  return (
    <div>
      <Header />
      <main className="page-wrapper">
        <img
          className="profile-background-image"
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee7badfced483aeb030d28a75ffdfa0b6cd0e1bd17d319ed9d7bef87a2fc07c8?apiKey=0cd5b3eb85e74a83a268d41d07a9c27f&"
          alt="Background"
        />
        <div className="profile-content-container">
          <ProfileHeader
            toggleEditMode={toggleEditMode}
            isEditing={isEditing}
            profileImageUrl={profileImageUrl}
            handleProfileImageChange={handleProfileImageChange}
          />
          <section className="info-container">
            <BasicInfo
              isEditing={isEditing}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              gender={gender}
              setGender={setGender}
            />
            <ContactInfo
              isEditing={isEditing}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
            />
            <SecuritySection isEditing={isEditing} openDeleteConfirm={openDeleteConfirm} />
            <RecordsSection />
          </section>
          {isEditing && (
            <div className="button-container">
              <button className="save-profilebut" onClick={handleSaveProfile}>
                Save
              </button>
            </div>
          )}
        </div>
      </main>
      {isDeleteConfirmOpen && (
      <DeleteConfirmPopup
        onDeleteConfirm={handleDeleteAccount}
        onClose={closeDeleteConfirm}
      />
    )}
    </div>
  );
};

const ProfileHeader = ({ toggleEditMode, isEditing, profileImageUrl, handleImageChange, handleProfileImageChange }) => (
  <section className="profile-section">
    <div className="profile-container">
      <div className="profile-image">
      <img src={profileImageUrl} alt="Profile" />
        {isEditing && (
          <input 
            type="file" 
            onChange={handleProfileImageChange} 
          />
        )}
      </div>
      <h1 className="profile-name">[username]</h1>
    </div>
    <div className="button-container">
      <button
        className={`edit-profilebut ${isEditing ? 'save-profilebut' : ''}`}
        onClick={toggleEditMode}
      >
        {isEditing ? 'Save' : 'Edit Profile'}
      </button>
    </div>
  </section>
);

const BasicInfo = ({ isEditing, firstName, setFirstName, lastName, setLastName, gender, setGender }) => (
  <section className="info-section">
    <h2 className="section-title">Basic Info</h2>
    <div className="form-group">
      <h2 className="section-names">First Name</h2>
      <input
        id="firstName"
        type="profile-text"
        value={firstName || ''}
        readOnly={!isEditing}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
    <div className="form-group">
      <h2 className="section-names">Last Name</h2>
      <input
        id="lastName"
        type="profile-text"
        value={lastName || ''}
        readOnly={!isEditing}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
    <div className="form-group">
      <h2 className="section-names">Gender</h2>
      <div className="gender-options">
        <label className="gender-option" htmlFor="male">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === 'male'}
            disabled={!isEditing}
            onChange={() => setGender('male')}
          />
          <span className="custom-radio"></span>
          <h2 className="gender-font">Male</h2>
        </label>
        <label className="gender-option" htmlFor="female">
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === 'female'}
            disabled={!isEditing}
            onChange={() => setGender('female')}
          />
          <span className="custom-radio"></span>
          <h2 className="gender-font">Female</h2>
        </label>
        <label className="gender-option" htmlFor="other">
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={gender === 'other'}
            disabled={!isEditing}
            onChange={() => setGender('other')}
          />
          <span className="custom-radio"></span>
          <h2 className="gender-font">Prefer not to say</h2>
        </label>
      </div>
    </div>
  </section>
);

const ContactInfo = ({ isEditing, email, setEmail, phone, setPhone }) => (
  <section className="contact-section">
    <h2 className="section-title">Contact Info</h2>
    <div className="form-group">
      <h2 className="section-names">Email</h2>
      <input
        id="email"
        type="profile-text"
        value={email}
        readOnly={!isEditing}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="form-group">
      <h2 className="section-names">Phone</h2>
      <input
        id="phone"
        type="profile-text"
        value={phone || ''}
        readOnly={!isEditing}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
  </section>
);

const SecuritySection = ({ isEditing, openDeleteConfirm }) => (
  <section className="security-section">
    <h2 className="section-title">Security</h2>
    <div className="form-group">
      <h2 className="section-names">Password</h2>
      <input 
      id="password" 
      type="password" 
      value="test" 
      readOnly={!isEditing} 
      style={{color: 'gray'}} />
    </div>
    <div className="form-group">
      <h2 className="section-names">Two-Factor Authentication</h2>
      <div className="toggle-switch">
        <input
          type="checkbox"
          id="twoFactorAuth"
          name="twoFactorAuth"
          className="toggle-switch-checkbox"
          checked
          disabled
        />
        <label className="toggle-switch-label" htmlFor="twoFactorAuth">
          <span className="toggle-switch-inner"></span>
          <span className="toggle-switch-switch"></span>
        </label>
      </div>
      <div className='button-deleteAccount'>
        <button className='deleteAccount' onClick={openDeleteConfirm}>Delete Account</button>
      </div>
    </div>
  </section>
);

const RecordsSection = () => (
  <section className="records-section">
    <h2 className="section-title">Records</h2>
    <div className="record-item">
      <h2 className="record-date">June 26, 2023</h2>
      <p className="record-description">You changed your email address</p>
    </div>
    <div className="record-item">
      <h2 className="record-date">June 20, 2023</h2>
      <p className="record-description">You enabled two-factor authentication</p>
    </div>
    <div className="record-item">
      <h2 className="record-date">June 15, 2023</h2>
      <p className="record-description">You updated your profile picture</p>
    </div>
  </section>
);

export default ProfilePage;
