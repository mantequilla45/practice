import React, { useState } from 'react';
import './Profile.css';
import Header from './Header';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('Theo Ryan');
  const [lastName, setLastName] = useState('Roz');
  const [email, setEmail] = useState('botilyakelvinator45@gmail.com');
  const [phone, setPhone] = useState('09689384951');
  const [gender, setGender] = useState('male');

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
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
        <ProfileHeader toggleEditMode={toggleEditMode} isEditing={isEditing} />
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
          <SecuritySection isEditing={isEditing} />
          <RecordsSection />
        </section>
      </div>
    </main>

    </div>
  );
};

const ProfileHeader = ({ toggleEditMode, isEditing }) => (
  <header className="header-wrapper">
    <div className="profile-container">
      <div className="profile-image"></div>
      <h1 className="profile-name">Botilya45</h1>
    </div>
    <div className="button-container">
      <button 
        className={`edit-profilebut ${isEditing ? 'save-profilebut' : ''}`} 
        onClick={toggleEditMode}
      >
        {isEditing ? 'Save' : 'Edit Profile'}
      </button>
    </div>
  </header>
);


const BasicInfo = ({ isEditing, firstName, setFirstName, lastName, setLastName, gender, setGender }) => (
  <section className="info-section">
    <h2 className="section-title">Basic Info</h2>
    <div className="form-group">
      <h2 className="section-names">First Name</h2>
      <input
        id="firstName"
        type="profile-text"
        value={firstName}
        readOnly={!isEditing}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
    <div className="form-group">
      <h2 className="section-names">Last Name</h2>
      <input
        id="lastName"
        type="profile-text"
        value={lastName}
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
      <h2 className="section-names">Contact Number</h2>
      <input
        id="phone"
        type="profile-text"
        value={phone}
        readOnly={!isEditing}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
  </section>
);

const SecuritySection = ({ isEditing }) => (
  <section className="security-wrapper">
    <h2 className="section-title">Security</h2>
    <div className="form-group">
      <h2 className="section-names">Password</h2>
      <input
        id="password"
        type="profile-text"
        value="********"
        readOnly={!isEditing}
      />
    </div>
    {<a className="change-password-link">Change Password</a>}
  </section>
);

const recordsData = [
  { id: 1, date: '20/07/2024', weight: '55kg', age: 40, symptoms: 'Headache, Fever, Cough', healthConditions: 'High blood pressure, Asthma' },
  { id: 2, date: '20/07/2024', weight: '55kg', age: 40, symptoms: 'Headache, Fever, Cough', healthConditions: 'High blood pressure, Asthma' },
  { id: 3, date: '20/07/2024', weight: '55kg', age: 40, symptoms: 'Headache, Fever, Cough', healthConditions: 'High blood pressure, Asthma' },
  { id: 4, date: '20/07/2024', weight: '55kg', age: 40, symptoms: 'Headache, Fever, Cough', healthConditions: 'High blood pressure, Asthma' },
];

const RecordsSection = () => (
  <section className="records-wrapper">
    <h2 className="section-title">Records</h2>
    <table className="records-table">
      <thead>
        <tr>
          <th>Record ID</th>
          <th>Date</th>
          <th>Weight</th>
          <th>Age</th>
          <th>Symptoms</th>
          <th>Health Conditions</th>
        </tr>
      </thead>
      <tbody>
        {recordsData.map((record, index) => (
          <tr key={index}>
            <td>{record.id}</td>
            <td>{record.date}</td>
            <td>{record.weight}</td>
            <td>{record.age}</td>
            <td>{record.symptoms}</td>
            <td>{record.healthConditions}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default ProfilePage;
