import React, { useState, useEffect } from 'react';
import './Profile.css';
import Header from './Header';
import { data, storage, auth } from './firebase';  // Updated import for Firestore, Storage, and Auth
import { onAuthStateChanged, updatePassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Button, Modal } from 'react-bootstrap';

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
  const [username, setUsername] = useState('');
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState(null);

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

  const openDeleteConfirm = () => {
    setIsDeleteConfirmOpen(true);
  };
  
  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
  };

  const handleChangePassword = async ()=> {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setChangePasswordError(null);
        alert('Password updated successfully.');
        setIsChangePasswordOpen(false);
      }
    } catch (e) {
      console.error('Error updating password: ', e);
      alert('Failed to update password. Please try again.')
    }
  }

  const DeleteConfirmPopup = ({ show, onClose, onDeleteConfirm }) => {
  <div>
    <Modal 
      show={isDeleteConfirmOpen} 
      onHide={onClose}>
      <Modal.Header closeButton style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        <Modal.Title>Confirm Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete your account? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onDeleteConfirm}>
          Delete Account
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
};

  const ChangePasswordModal = ({
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
    error,
    onClose, // Added onClose prop
  }) => (
    <div className="change-password-modal">
        <Modal 
          show={true} 
          onHide={onClose}
          backdrop='static'
          keyboard={false}
          centered
          scrollable
          >
        <Modal.Header closeButton style={{ display: 'flex', flexDirection: 'column-reverse' }}>
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
          {error && <p className="error-message">{error}</p>}
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
    </div>
  );

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
            <SecuritySection isEditing={isEditing} openDeleteConfirm={openDeleteConfirm} openChangePassword={openChangePassword}  />
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
      </main>
      {isDeleteConfirmOpen && (
      <DeleteConfirmPopup
        onDeleteConfirm={handleDeleteAccount}
        onClose={closeDeleteConfirm}
      />
      )}
      {isChangePasswordOpen && (
        <ChangePasswordModal
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleChangePassword={handleChangePassword}
          error={changePasswordError}
          onClose={closeChangePassword}
        />
      )}
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
    {/* <div className="form-group">
      <h2 className="section-names">Password</h2>
      <input 
      id="password" 
      type="password" 
      value="test" 
      readOnly={!isEditing} 
      style={{color: 'gray'}} />
    </div> */}
    <div className="form-group">
      {/* <h2 className="section-names">Two-Factor Authentication</h2>
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
      </div> */}
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
