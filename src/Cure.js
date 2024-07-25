import React, { useEffect, useState, useRef } from "react";
import './Cure.css';
import { addCure, getCombinedSymptoms, getCures, saveSearchRecord } from "./cureService";
import Header from './Header';
import Fuse from "fuse.js";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

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
          id="Female"
          name="gender"
          checked={personalInfo.gender === 'Female'}
          onChange={() => setPersonalInfo({ ...personalInfo, gender: 'Female' })}
        />
        <label className="advanced-search-radio-label" htmlFor="Female">Female</label>
      </div>
      <div className="advanced-search-radio-option">
        <input
          className="advanced-search-radio-input"
          type="radio"
          id="Male"
          name="gender"
          checked={personalInfo.gender === 'Male'}
          onChange={() => setPersonalInfo({ ...personalInfo, gender: 'Male' })}
        />
        <label className="advanced-search-radio-label" htmlFor="Male">Male</label>
      </div>
      <div className="advanced-search-radio-option">
        <input
          className="advanced-search-radio-input"
          type="radio"
          id="Other"
          name="gender"
          checked={personalInfo.gender === 'Other'}
          onChange={() => setPersonalInfo({ ...personalInfo, gender: 'Other' })}
        />
        <label className="advanced-search-radio-label" htmlFor="Other">Other</label>
      </div>
    </div>
    <label className="advanced-search-form-label" htmlFor="weight">Weight</label>
    <input
      className="advanced-search-form-input"
      id="weight"
      type="number"
      placeholder="Your answer in kg"
      value={personalInfo.weight}
      onChange={(e) => setPersonalInfo({ ...personalInfo, weight: e.target.value })}
    />
  </div>
);

const SymptomCheckList = ({ selectedSymptoms, setSelectedSymptoms }) => {
  const symptoms = [
    'Headache', 'Fever', 'Cold', 'Cough with phlegm',
    'Dry cough', 'Loss of appetite', 'Diarrhea', 'Constipation',
    'Nausea', 'Vomiting', 'Fatigue', 'Muscle pain', 'Body pain','Abdominal pain'
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
            <h1 className="advanced-search-checkbox-label" htmlFor={`symptom-${index}`}>{symptom}</h1>
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



const HighlightedText = ({ text, highlight }) => {
  if (!highlight || highlight.length === 0) {
    return <span>{text}</span>;
  }

  // Escape regex characters
  const regexEscaped = highlight.map(symptom => symptom.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
  const regex = new RegExp(`(${regexEscaped.join('|')})`, 'gi');

  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
      )}
    </span>
  );
};

const AdvancedSearchForm = ({ handleAdvancedSearch }) => {
  const [personalInfo, setPersonalInfo] = useState({ name: '', age: '', gender: '', weight: '' });
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [addRecord, setAddRecord] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdvancedSearch({ selectedSymptoms, addRecord, personalInfo, selectedConditions });
  };

  return (
    <form className="advanced-search-container" onSubmit={handleSubmit}>
      <AdvancedSearchHeader />
      <div className="advanced-search-form-content">
        <div className="advanced-search-symptom-section">
          <PersonalInfoForm personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
        </div>
        <div className="advanced-search-conditions-section">
          <SymptomCheckList selectedSymptoms={selectedSymptoms} setSelectedSymptoms={setSelectedSymptoms} />
          <HealthConditionsList selectedConditions={selectedConditions} setSelectedConditions={setSelectedConditions} />
        </div>
      </div>
      <div className="advanced-search-button-container">
        <input 
          type="checkbox" 
          id="add-record-checkbox"
          checked={addRecord}
          onChange={(e)=> setAddRecord(e.target.checked)}
        />
        <label className="add-record-label" htmlFor="add-record-checkbox">Add record</label>
        <button className="advanced-search-assess-button" type="submit">Assess</button>
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
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false); 
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [noResults, setNoResults] = useState(false);

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

    // Split search terms by semicolon and normalize
    const searchTerms = searchTerm.toLowerCase().split(';').map(term => term.trim());
    console.log('Search Terms:', searchTerms);

    // Define Fuse.js options for fuzzy search with tokenization
    const options = {
      includeScore: true,
      keys: ['symptoms'],
      threshold: 0.4, // Adjusted for better fuzziness
      distance: 500,  // Adjusted for better relevance
      tokenize: true,
      matchAllTokens: true,
    };

    // Initialize Fuse.js with all cures and the defined options
    const fuse = new Fuse(allCures, options);

    // Perform the search for each term individually and collect unique results
    const resultsSet = new Set();
    searchTerms.forEach(term => {
      const result = fuse.search(term);
      result.forEach(item => resultsSet.add(item.item));
    });

    const filteredCures = Array.from(resultsSet);
    setCures(filteredCures);
    setNoResults(filteredCures.length === 0);

    // Debugging: Log the filtered cures
    console.log('Filtered Cures:', filteredCures);

    // Set the search terms for highlighting
    setSelectedSymptoms(searchTerms);
  };

  const handleAdvancedSearch = async ({ selectedSymptoms, addRecord, personalInfo, selectedConditions }) => {
    console.log('Advanced Search Data:', { selectedSymptoms });

    const combinedsymptomsData = await getCombinedSymptoms();

    //save the selected symptoms to highlight in results
    setSelectedSymptoms(selectedSymptoms);

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

    if (selectedSymptoms.length === 0) {
      setCures([]);
      setNoResults(true);
      return;
    }

    // Normalize and sort the selected symptoms
    const normalizedSelectedSymptoms = selectedSymptoms.map(symptom => symptom.toLowerCase());

    const filteredCures = combinedsymptomsData.filter(cure => {
      // Normalize the cure symptoms
      const cureSymptoms = cure.symptoms.toLowerCase().split(';').map(s => s.trim());
      if (normalizedSelectedSymptoms.every(symptom => cureSymptoms.includes(symptom)) == null) {
        noResults(true);
      }

      // Check if all selected symptoms are present in the cure's symptoms
      return normalizedSelectedSymptoms.every(symptom => cureSymptoms.includes(symptom));
    });

    console.log('Filtered cures: ', filteredCures);

    setCures(filteredCures);
    setNoResults(filteredCures.length === 0);
    

    if (addRecord) {
      const currentUser = getAuth().currentUser;
      const searchRecord = {
        userId: currentUser.uid,
        personalInfo,
        selectedSymptoms,
        selectedConditions,
        addRecord,
        timestamp: Timestamp.now()
      };

      await saveSearchRecord(searchRecord, currentUser.uid);
    }
  };

  const circleRef = useRef(null);
  const checkboxRef = useRef(null);

  const handleToggle = () => {
    if (checkboxRef.current && circleRef.current) {
      
      if (checkboxRef.current.checked) {
        circleRef.current.style.left = '24px';
        setIsAdvancedSearch(true);
        document.querySelector('.main-content').style.marginTop = '-120px';
      } else {
        circleRef.current.style.left = '0px';
        setIsAdvancedSearch(false);
        document.querySelector('.main-content').style.marginTop = '0';
      }
    }
  };

  useEffect(() => {
    circleRef.current.style.left = '0px';
    if (checkboxRef.current) {
      checkboxRef.current.addEventListener('change', handleToggle);
    }

    return () => {
      if (checkboxRef.current) {
        checkboxRef.current.removeEventListener('change', handleToggle);
      }
    };
  }, []);

  return (
    <div className={`cure-body ${isAdvancedSearch ? 'advanced-search-active' : ''}`}>
      <Header />
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-header">
            <h1 className="hero-title">Welcome to BSDOC</h1>
            <div className="toggle_background_box">
              Advanced Search
              <label className="toggle_box">
                <input type="checkbox" id="cure-checkbox" ref={checkboxRef} />
                <div className="circle" ref={circleRef}></div>
              </label>
            </div>
          </div>

          {isAdvancedSearch ? (
            <div className="advanced-search-body active">
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
                <button type="submit" aria-label="Search" className="search-button"></button>
              </form>
            </section>
          )}

          <p className="hero-description">Introducing a new way to diagnose your sickness.</p>
          <div className="cure-list-container">
            {noResults || cures.length > 0 ? (
              <div className="search-result-title-container">
                <h1 className="search-result-title">Search Results</h1>
              </div>
            ) : null}
            <section className="cure-list">
              {noResults ? (
                <div className="cure-item-container">
                  <h4>No cure can be found in the data. Please try again or report to the developers.</h4>
                </div>
              ) : (
                cures.map(cure => (
                  <div key={cure.id} className="cure-item-container">
                    <h1 className="cure-item-header">Possible Cures for {cure.diagnosis}</h1>
                    <p className="cure-item-symptoms">
                    <b >Symptoms: </b>
                      <HighlightedText text={cure.symptoms} highlight={selectedSymptoms} />
                    </p>
                    <ul  className="cure-cures">
                      {cure.description.split(';').map((desc, index) => (
                        <p className="cure-items" key={index}>{desc.trim()}</p>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </section>
          </div>
        </section>
      </main>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe2f0a109be8118d3d4f82e0383523128dd7d2ba1fecff3c0d628cd098876def?apiKey=d22a939618da4e96809232126d1f951c&" alt="Background" className="cure-background-image" />
    </div>
  );
};

export default App;