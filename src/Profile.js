import React, { useState, useEffect } from 'react';
import './Profile.css';
import Header from './Header';
import { data, storage, auth } from './firebase';  // Updated import for Firestore, Storage, and Auth
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [username, setUsername] = useState('');
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState(null);

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const handleCloseDeleteAccount = () => setShowDeleteAccount(false);
  const handleShowDeleteAccount = () => setShowDeleteAccount(true);

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
        setUsername(userData.username || '');
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setPhone(userData.phone || '');
        setGender(userData.gender || '');
        setProfileImageUrl(userData.profileImageUrl || '');
        if (userData.profileImageUrl) {
          const profileImageRef = ref(storage, userData.profileImageUrl);
          const profileImageUrl = await getDownloadURL(profileImageRef);
          setProfileImageUrl(profileImageUrl);
        } else {
          console.log('No profile image found'); // Debug line
        }
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

  const openChangePassword = () => {
    setIsChangePasswordOpen(true);
    setChangePasswordError(null);
  }

  const closeChangePassword = () => {
    setIsChangePasswordOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setChangePasswordError(null);
  };

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
            handleUpdateProfile={handleUpdateProfile}
            handleSaveProfile={handleSaveProfile}
            username={username}
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
            <SecuritySection isEditing={isEditing} openDeleteConfirm={handleShowDeleteAccount} openChangePassword={openChangePassword}  />
            <RecordsSection />
          </section>
          {/* {isEditing && (
            <div className="button-container">
              <button className="save-profilebut" onClick={handleSaveProfile}>
                Save
              </button>
            </div>
          )} */}
        </div>
        <ChangePassword isOpen={isChangePasswordOpen} onClose={closeChangePassword}/>
        <DeleteAccount show={showDeleteAccount} handleClose={handleCloseDeleteAccount}/>
      </main>
    </div>
  );
};

const placeholderImageUrl = 'https://clipground.com/images/user-icon-vector-png-6.png';

const ProfileHeader = ({ toggleEditMode, isEditing, profileImageUrl, handleProfileImageChange, username, handleSaveProfile }) => (
  <section className="profile-section">
    <div className="profile-image-container">
      <div className="profile-image">
        <img src={profileImageUrl || placeholderImageUrl ||'default-image-url'} alt="Profile" className='profile-image' />
        {isEditing && (
          <input 
            type="file" 
            className='profile-image-edit'
            onChange={handleProfileImageChange} 
          />
        )}
      </div>
    </div>
    <h1 className="profile-name" style={{color: 'black'}}>{username}</h1>
    <div className="button-container">
          {isEditing ? (
            <button className="save-profilebut" onClick={handleSaveProfile}>
              Save
            </button>
          ) : (
            <button
              className="edit-profilebut"
              onClick={toggleEditMode}
            >
              Edit Profile
            </button>
          )}
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
            value="Male"
            checked={gender === 'Male'}
            disabled={!isEditing}
            onChange={() => setGender('Male')}
          />
          <span className="custom-radio"></span>
          <h2 className="gender-font">Male</h2>
        </label>
        <label className="gender-option" htmlFor="female">
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            checked={gender === 'Female'}
            disabled={!isEditing}
            onChange={() => setGender('Female')}
          />
          <span className="custom-radio"></span>
          <h2 className="gender-font">Female</h2>
        </label>
        <label className="gender-option" htmlFor="other">
          <input
            type="radio"
            id="other"
            name="gender"
            value="Other"
            checked={gender === 'Other'}
            disabled={!isEditing}
            onChange={() => setGender('Other')}
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

const SecuritySection = ({ isEditing, openDeleteConfirm, openChangePassword }) => (
  <section className="security-wrapper">
    <h2 className="section-title">Security</h2>
    <div className="form-group">
      <button className='change-password' onClick={openChangePassword}>Change Password</button>
      <div className='button-deleteAccount'>
        <button className='deleteAccount' onClick={openDeleteConfirm}>Delete Account</button>
      </div>
    </div>
  </section>
);

const RecordsSection = () => (
  <section className="records-wrapper">
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
