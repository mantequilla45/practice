import React, { useEffect, useState } from "react";
import './Cure.css';
import { addCure, getCures } from "./cureService";
import Header from './Header';

function App() {
  const [cures, setCures] = useState([]);
  const [symptoms, setSymptom] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [allCures, setAllCures] = useState([]);

  useEffect(() => {
    const fetchCures = async () => {
      const cureList = await getCures('');
      setAllCures(cureList);
      setCures(cureList); // Set initial cures list
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
    setAllCures(updatedCureList);
    setCures(updatedCureList); // Refresh the cure list once added
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredCures = allCures.filter(cure => 
      cure.symptoms.toLowerCase() === searchTerm.toLowerCase()
    );
    setCures(filteredCures);
  };

  return (
    <>
      <Header />
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe2f0a109be8118d3d4f82e0383523128dd7d2ba1fecff3c0d628cd098876def?apiKey=d22a939618da4e96809232126d1f951c&" alt="Background" className="background-image" />
      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">Welcome to BSDOC</h1>
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
                <h1 className="search-button-text">Search Symptom</h1>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b58ee50fb2d2388824c311d90e981de513f2169502c99f9030074d05ffd099b8?apiKey=d22a939618da4e96809232126d1f951c&" alt="Search Icon" className="search-icon" />
              </button>
            </form>
          </section>
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
        {/* Uncomment this section if you want to add new cures */}
        {/* <section>
          <h1>Add a Cure</h1>
          <form onSubmit={handleAddCure}>
            <input
              type="text"
              placeholder="Symptom"
              value={symptoms}
              onChange={(e) => setSymptom(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button type="submit">Add Cure</button>
          </form>
        </section> */}
      </main>
    </>
  );
};

export default App;
