import React, { useEffect, useState, useRef } from "react";
import './Cure.css';
import { addCure, getCombinedSymptoms, getCures } from "./cureService";
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

const PersonalInfoForm = ({ personalInfo, setPersonalInfo }) => (
  <div className="advanced-search-form-field">
    <label className="advanced-search-form-label" htmlFor="name">Name</label>
    <input
      className="advanced-search-form-input"
      id="name"
      type="text"
      placeholder="Your answer"
      value={personalInfo.name}
      onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
    />
    <label className="advanced-search-form-label" htmlFor="age">Age</label>
    <input
      className="advanced-search-form-input"
      id="age"
      type="number"
      placeholder="Your answer"
      value={personalInfo.age}
      onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
    />
    <label className="advanced-search-form-label">Gender</label>
    <div className="advanced-search-radio-group">
      <div className="advanced-search-radio-option">
        <input
          className="advanced-search-radio-input"
          type="radio"
          id="female"
          name="gender"
          checked={personalInfo.gender === 'female'}
          onChange={() => setPersonalInfo({ ...personalInfo, gender: 'female' })}
        />
        <label className="advanced-search-radio-label" htmlFor="female">Female</label>
      </div>
      <div className="advanced-search-radio-option">
        <input
          className="advanced-search-radio-input"
          type="radio"
          id="male"
          name="gender"
          checked={personalInfo.gender === 'male'}
          onChange={() => setPersonalInfo({ ...personalInfo, gender: 'male' })}
        />
        <label className="advanced-search-radio-label" htmlFor="male">Male</label>
      </div>
    </div>
    <label className="advanced-search-form-label" htmlFor="weight">Weight</label>
    <input
      className="advanced-search-form-input"
      id="weight"
      type="number"
      placeholder="Your answer"
      value={personalInfo.weight}
      onChange={(e) => setPersonalInfo({ ...personalInfo, weight: e.target.value })}
    />
  </div>
);

const SymptomCheckList = ({ selectedSymptoms, setSelectedSymptoms }) => {
  const symptoms = [
    'Headache', 'Fever', 'Cold', 'Cold with phlegm',
    'Dry cough', 'Loss of appetite', 'Diarrhea', 'Constipation',
    'Nausea', 'Vomiting', 'Fatigue', 'Muscle pain', 'Abdominal pain'
  ];

  const handleSymptomChange = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(item => item !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div className="advanced-search-checklist-section">
      <h2 className="advanced-search-checklist-title">Symptoms</h2>
      <div className="advanced-search-checklist-grid">
        {symptoms.map((symptom, index) => (
          <div key={index} className="advanced-search-checkbox-item">
            <input
              className="advanced-search-checkbox"
              type="checkbox"
              id={`symptom-${index}`}
              checked={selectedSymptoms.includes(symptom)}
              onChange={() => handleSymptomChange(symptom)}
            />
            <label className="advanced-search-checkbox-label" htmlFor={`symptom-${index}`}>{symptom}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

const HealthConditionsList = ({ selectedConditions, setSelectedConditions }) => {
  const healthConditions = [
    'High blood pressure', 'Diabetes', 'Tuberculosis', 'Kidney disease',
    'Liver disease', 'Heart disease', 'Asthma', 'Cancer'
  ];

  const handleConditionChange = (condition) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(item => item !== condition)
        : [...prev, condition]
    );
  };

  return (
    <div className="advanced-search-checklist-section">
      <h2 className="advanced-search-checklist-title">Underlying health conditions</h2>
      <div className="advanced-search-conditions-grid">
        {healthConditions.map((condition, index) => (
          <div key={index} className="advanced-search-checkbox-item">
            <input
              className="advanced-search-checkbox"
              type="checkbox"
              id={`condition-${index}`}
              checked={selectedConditions.includes(condition)}
              onChange={() => handleConditionChange(condition)}
            />
            <label className="advanced-search-checkbox-label" htmlFor={`condition-${index}`}>{condition}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdvancedSearchForm = ({ handleAdvancedSearch }) => {
  const [personalInfo, setPersonalInfo] = useState({ name: '', age: '', gender: '', weight: '' });
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdvancedSearch({ personalInfo, selectedSymptoms, selectedConditions });
  };

  return (
    <form className="advanced-search-container.active" onSubmit={handleSubmit}>
      <AdvancedSearchHeader />
      <div className="advanced-search-form-content">
        <div className="advanced-search-symptom-section">
          <PersonalInfoForm personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
        </div>
        <div className="advanced-search-conditions-section">
          <SymptomCheckList selectedSymptoms={selectedSymptoms} setSelectedSymptoms={setSelectedSymptoms} />
          <HealthConditionsList selectedConditions={selectedConditions} setSelectedConditions={setSelectedConditions} />
          <div className="advanced-search-button-container">
            <input type="checkbox" id="add-record-checkbox" />
            <label className="add-record-label">Add record</label>
            <button className="advanced-search-assess-button" type="submit">Assess</button>
          </div>
        </div>
      </div>
    </form>
  );
};

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

  const handleAdvancedSearch = async ({ personalInfo, selectedSymptoms, selectedConditions }) => {
    console.log('Advanced Search Data:', { personalInfo, selectedSymptoms, selectedConditions });

    const combinedsymptomsData = await getCombinedSymptoms();

    const fuseOptions = {
      includeScore: true,
      keys: ['symptoms'],
      threshold: 0.3,
      distance: 100,
    };

    // const fuse = new Fuse(combinedsymptomsData, fuseOptions);

    // const searchTerm = selectedSymptoms.join(';'.toLowerCase());

    // const symptomsSearch = selectedSymptoms.map(symptom => fuse.search(symptom.toLowerCase())).flat();
    // const conditionsSearch = selectedConditions.map(condition => fuse.search(condition.toLowerCase())).flat();

    // const allSearchResults = [...symptomsSearch, ...conditionsSearch];

    // const results = fuse.search(searchTerm);
    // const filteredResults = results.map(result => result.item);

    // const uniqueResults = [...new Map(filteredResults.map(item => [item.id, item])).values()];

    // setCures(uniqueResults);

    const fuse = new Fuse(combinedsymptomsData, fuseOptions);

    const symptomsLower = selectedSymptoms.map(symptom => symptom.toLowerCase());
    const searchQuery = symptomsLower.join(', ');

    const result = fuse.search(searchQuery);

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
      
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.marginTop = checkboxRef.current.checked ? '-120px' : '0';
      }

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
              <input type="checkbox" id="uniqueCheckbox" ref={checkboxRef} />
              <div className="circle" ref={circleRef}></div>
            </label>
          </div>

          {isAdvancedSearch ? (
            <div className="advanced-search-container active">
              <AdvancedSearchForm handleAdvancedSearch={handleAdvancedSearch} />
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
