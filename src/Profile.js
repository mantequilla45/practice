import React from 'react';
import './Profile.css';
import Header from './Header';

const ProfilePage = () => {
  return (
    <main className="page-wrapper">
      <img
        className="profile-background-image"
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee7badfced483aeb030d28a75ffdfa0b6cd0e1bd17d319ed9d7bef87a2fc07c8?apiKey=0cd5b3eb85e74a83a268d41d07a9c27f&"
        alt="Background"
      />
      <div className="content-container">
        <ProfileHeader />
        <section className="info-container">
          <BasicInfo />
          <ContactInfo />
          <SecuritySection />
          <RecordsSection />
        </section>
      </div>
    </main>
  );
};

const ProfileHeader = () => (
  
  <header className="header-wrapper">
    <div className="profile-container">
      <div className="profile-image"></div>
      <h1 className="profile-name">Botilya45</h1>
    </div>
    <div className="button-container">
      <button className="edit-profilebut">Edit Profile</button>
    </div>
   </header>
);

const BasicInfo = () => (
  <section className="info-section">
    <h2 className="section-title">Basic Info</h2>
    <div className="form-group">
      <h2 className="section-names">First Name</h2>
      <input id="firstName" type="profile-text" value="Theo Ryan" readOnly />
    </div>
    <div className="form-group">
      <h2 className="section-names">Last Name</h2>
      <input id="lastName" type="profile-text" value="Roz" readOnly />
    </div>
    <div className="form-group">
    <h2 className="section-names">Gender</h2>
      <div className="gender-options">
        <label className="gender-option" htmlFor="male">
          <input type="radio" id="male" name="gender" value="male" />
          <span className="custom-radio"></span>
          <h2 className="gender-font">Male</h2>
        </label>
        <label className="gender-option" htmlFor="female">
          <input type="radio" id="female" name="gender" value="female" defaultChecked />
          <span className="custom-radio"></span>
          <h2 className="gender-font">Female</h2>
        </label>
        <label className="gender-option" htmlFor="other">
          <input type="radio" id="other" name="gender" value="other" />
          <span className="custom-radio"></span>
          <h2 className="gender-font">Prefer not to say</h2>
        </label>
      </div>

    </div>
  </section>
);

const ContactInfo = () => (
  <section className="contact-section">
    <h2 className="section-title">Contact Info</h2>
    <div className="form-group">
    <h2 className="section-names">Email</h2>
      <input id="email" type="profile-text" value="botilyakelvinator45@gmail.com" readOnly />
    </div>
    <div className="form-group">
    <h2 className="section-names">Contact Number</h2>
      <input id="phone" type="profile-text" value="09689384951" readOnly />
    </div>
  </section>
);

const SecuritySection = () => (
  <section className="security-wrapper">
    <h2 className="section-title">Security</h2>
    <div className="form-group">
    <h2 className="section-names">Password</h2>
      <input id="password" type="profile-text" value="********" readOnly />
    </div>
    <a className="change-password-link">Change Password</a>
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
