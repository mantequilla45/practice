import React, { useEffect, useState, useRef } from "react";
import './Cure.css';
import { addCure, getCures } from "./cureService";
import Header from './Header';
import Fuse from "fuse.js";

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
              {/* Advanced search content goes here */}
              <p>Advanced search options</p>
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
