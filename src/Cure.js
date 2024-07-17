import React, { useEffect, useState, useRef } from "react";
import './Cure.css';
import { addCure, getCures } from "./cureService";
import Header from './Header';
import Fuse from "fuse.js";

// Advanced Search Components
const AdvancedSearchHeader = () => (
  <div className="advanced-search-header">
    <h1 className="advanced-search-header-title">BSDOC Advanced Symptoms Search</h1>
    <p className="advanced-search-header-subtitle">
      Please fill the following form with the symptoms you are feeling.
    </p>
  </div>
);

const PersonalInfoForm = () => (
  <div className="advanced-search-form-field">
    <label className="advanced-search-form-label" htmlFor="name">Name</label>
    <input className="advanced-search-form-input" id="name" type="text" placeholder="Your answer" />
    <label className="advanced-search-form-label" htmlFor="age">Age</label>
    <input className="advanced-search-form-input" id="age" type="number" placeholder="Your answer" />
    <label className="advanced-search-form-label">Gender</label>
    <div className="advanced-search-radio-group">
      <div className="advanced-search-radio-option">
        <input className="advanced-search-radio-input" type="radio" id="female" name="gender" />
        <label className="advanced-search-radio-label" htmlFor="female">Female</label>
      </div>
      <div className="advanced-search-radio-option">
        <input className="advanced-search-radio-input" type="radio" id="male" name="gender" />
        <label className="advanced-search-radio-label" htmlFor="male">Male</label>
      </div>
    </div>
    <label className="advanced-search-form-label" htmlFor="weight">Weight</label>
    <input className="advanced-search-form-input" id="weight" type="number" placeholder="Your answer" />
  </div>
);

const SymptomCheckList = () => {
  const symptoms = [
    'Headache', 'Fever', 'Cold', 'Cold with phlegm',
    'Dry cough', 'Loss of appetite', 'Diarrhea', 'Constipation',
    'Nausea', 'Vomiting', 'Fatigue', 'Muscle pain'
  ];

  return (
    <div className="advanced-search-checklist-section">
      <h2 className="advanced-search-checklist-title">Symptoms</h2>
      <div className="advanced-search-checklist-grid">
        {symptoms.map((symptom, index) => (
          <div key={index} className="advanced-search-checkbox-item">
            <input className="advanced-search-checkbox" type="checkbox" id={`symptom-${index}`} />
            <label className="advanced-search-checkbox-label" htmlFor={`symptom-${index}`}>{symptom}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

const HealthConditionsList = () => {
  const healthConditions = [
    'High blood pressure', 'Diabetes', 'Tuberculosis', 'Kidney disease',
    'Liver disease', 'Heart disease', 'Asthma', 'Cancer'
  ];

  return (
    <div className="advanced-search-checklist-section">
      <h2 className="advanced-search-checklist-title">Underlying health conditions</h2>
      <div className="advanced-search-conditions-grid">
        {healthConditions.map((condition, index) => (
          <div key={index} className="advanced-search-checkbox-item">
            <input className="advanced-search-checkbox" type="checkbox" id={`condition-${index}`} />
            <label className="advanced-search-checkbox-label" htmlFor={`condition-${index}`}>{condition}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdvancedSearchForm = () => (
  <form className=".advanced-search-container.active">
    <AdvancedSearchHeader />
    <div className="advanced-search-form-content">
      <div className="advanced-search-symptom-section">
        <PersonalInfoForm />
      </div>
      <div className="advanced-search-conditions-section">
        <SymptomCheckList />
        <HealthConditionsList />
        <div className="advanced-search-button-container">
          <button className="advanced-search-add-record-button" type="button">
            <span className="advanced-search-plus-icon"></span> Add another symptom
          </button>
          <button className="advanced-search-assess-button" type="submit">Assess</button>
        </div>
      </div>
    </div>
  </form>
);

function App() {
  const [cures, setCures] = useState([]);
  const [symptoms, setSymptom] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [allCures, setAllCures] = useState([]);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false); // State for advanced search toggle

  useEffect(() => {
    const fetchCures = async () => {
      const cureList = await getCures('');
      setAllCures(cureList);
    };
    fetchCures();
  }, []);

  const handleAddCure = async (e) => {
    e.preventDefault();
    const newCure = { symptoms, description };
    await addCure(newCure);
    setSymptom('');
    setDescription('');
    const updatedCureList = await getCures('');
    setAllCures(updatedCureList); // Refresh the cure list once added
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const options = {
      includeScore: true,
      keys: ['symptoms'],
      threshold: 0.3,
      distance: 100,
    };

    // Ensure case-insensitive search
    const fuse = new Fuse(
      allCures.map(cure => ({ ...cure, symptoms: cure.symptoms })),
      options
    );

    const result = fuse.search(searchTerm.toLowerCase());

    const filteredCures = result.map(cure => cure.item);

    setCures(filteredCures);
  };

  // Toggle button functionality
  const circleRef = useRef(null);
  const checkboxRef = useRef(null);

  const handleToggle = () => {
    if (checkboxRef.current) {
      circleRef.current.style.left = checkboxRef.current.checked ? '24px' : '0px';
      setIsAdvancedSearch(checkboxRef.current.checked);
    }
  };

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.addEventListener('click', handleToggle);
    }

    return () => {
      if (checkboxRef.current) {
        checkboxRef.current.removeEventListener('click', handleToggle); 
      }
    };
  }, []); 

  return (
    <div className={`cure-container ${isAdvancedSearch ? 'advanced-search-active' : ''}`}>
      <Header />
      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">Welcome to BSDOC</h1>
          <div className="background_box">Advanced Search
            <label className="toggle_box">
              <input type="checkbox" id="checkbox" ref={checkboxRef} />
              <div className="circle" ref={circleRef}></div>
            </label>
          </div>

          {isAdvancedSearch ? (
            <div className="advanced-search-container active">
              <AdvancedSearchForm />
            </div>
          ) : (
            <section className="search-section">
              <form className="search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  id="symptomSearch"
                  className="search-input"
                  placeholder="Type symptom here."
                  aria-label="Type symptom here."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" aria-label="Search" className="search-button">
                </button>
              </form>
            </section>
          )}
          <p className="hero-description">Introducing a new way to diagnose your sickness.</p>
          <section className="cure-list">
            {cures.map(cure => (
              <div key={cure.id} className="cure-item">
                <h2> Possible Cures for {cure.symptoms} </h2>
                {cure.description.split(';').map((desc, index) => (
                  <p key={index}>{desc.trim()}</p>
                ))}
              </div>
            ))}
          </section>
          
        </section>
        
      </main>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe2f0a109be8118d3d4f82e0383523128dd7d2ba1fecff3c0d628cd098876def?apiKey=d22a939618da4e96809232126d1f951c&" alt="Background" className="background-image" />
    </div>
  );
}

export default App;
