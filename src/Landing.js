import React, { useEffect,useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import './Landing.css';
import DevreportModal from './devreport';

const HeroSection = () => {
  return (
    <div className="landing-hero-section">
      <div className = "landing-left-column">
        <div className="landing-hero-content">
        <h1 className = "landing-hero-title">Your Personal Guide to Self-Care for Common Ailments</h1>
        <h2 className = "landing-hero-description">Take control of your health, save time, and find relief at home with BSDOC.</h2>
        <div className = "landing-cure-button-box">
        <a href="/cure" className="landing-cure-button">FIND A CURE</a></div>
        </div>
      </div>
      <div className = "landing-right-column">
        <img class="landing-hero-image" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9468847953b0a85498a7e4923ce907b1b96635871ec8b8cb0ce26f0ea148ca47?apiKey=d22a939618da4e96809232126d1f951c&" alt="Self-care illustration" />
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
  <div className ="services-section">
    <div className = "services-header">
      <h1 className = "services-section-title">Our Services</h1>
    </div>
    <div className = "services-container">
      <div className = "services-left-column">
        <h1 className = "service-title">Interactive Symptom Checker</h1>
        <div className = "services-description-container">
          <img class = "service-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/48d8ee2dc6769b0a06f1845c284f45e5ba63953e81a1e4928fe0cf213d03c6d3?apiKey=d22a939618da4e96809232126d1f951c&%27" alt="Service icon" />
          <h2 class = "service-description">Input symptoms to find the right cure</h2>
        </div>
        <div className = "services-description-container">
          <img class = "service-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/48d8ee2dc6769b0a06f1845c284f45e5ba63953e81a1e4928fe0cf213d03c6d3?apiKey=d22a939618da4e96809232126d1f951c&%27" alt="Service icon" />
          <h2 class = "service-description">Search results are filtered according to the symptoms</h2>
        </div>
          
        <div className = "services-description-container">
          <img class = "service-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/48d8ee2dc6769b0a06f1845c284f45e5ba63953e81a1e4928fe0cf213d03c6d3?apiKey=d22a939618da4e96809232126d1f951c&%27" alt="Service icon" />
          <h2 class = "service-description">Visual aids and explanations to help users understand their symptoms better</h2>
        </div>
      </div>
      <div className = "services-right-column">
        <img class="service-image" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7293ce676f2da7baff8877261dab11f5fa622754e970df6646026ea046eeb7d6?apiKey=0cd5b3eb85e74a83a268d41d07a9c27f&&apiKey=0cd5b3eb85e74a83a268d41d07a9c27f" alt="Interactive Symptom Checker" />
      </div>
    </div>

    <div className = "services-container">
      <div className = "otc-services-left-column">
        <img class="service-image" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b5004247f7fbd1c8b0f084d804e71e9457c218ddca3ddf8817253a57b27bacd?apiKey=d22a939618da4e96809232126d1f951c&" alt="OTC Medication Guidance" />
      </div>
      <div className = "otc-services-right-column">

        <h1 className = "service-title">OTC Medication Guidance</h1>
        <div className = "services-description-container">
          <img class = "service-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/48d8ee2dc6769b0a06f1845c284f45e5ba63953e81a1e4928fe0cf213d03c6d3?apiKey=d22a939618da4e96809232126d1f951c&%27" alt="Service icon" />
          <h2 class = "service-description">Find the right over-the-counter medications based on your symptoms</h2>
        </div>
        <div className = "services-description-container">
          <img class = "service-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/48d8ee2dc6769b0a06f1845c284f45e5ba63953e81a1e4928fe0cf213d03c6d3?apiKey=d22a939618da4e96809232126d1f951c&%27" alt="Service icon" />
          <h2 class = "service-description">Access information on uses, dosages, and precautions for common OTC medications</h2>
        </div>
        <div className = "services-description-container">
          <img class = "service-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/48d8ee2dc6769b0a06f1845c284f45e5ba63953e81a1e4928fe0cf213d03c6d3?apiKey=d22a939618da4e96809232126d1f951c&%27" alt="Service icon" />
          <h2 class = "service-description">Be informed about potential drug interactions and contraindications</h2>
        </div>
      </div>
    </div>
    <div className = "services-container">
      <div className = "services-left-column">
        <h1 className = "service-title">Personalized Health Tips</h1>
        <div className = "services-description-container">
          <img class = "service-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/48d8ee2dc6769b0a06f1845c284f45e5ba63953e81a1e4928fe0cf213d03c6d3?apiKey=d22a939618da4e96809232126d1f951c&%27" alt="Service icon" />
          <h2 class = "service-description">Receive health and wellness tips based on your profile and symptom history</h2>
        </div>
        <div className = "services-description-container">
          <img class = "service-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/48d8ee2dc6769b0a06f1845c284f45e5ba63953e81a1e4928fe0cf213d03c6d3?apiKey=d22a939618da4e96809232126d1f951c&%27" alt="Service icon" />
          <h2 class = "service-description">Save and track your health data over time</h2>
        </div>
          
        <div className = "services-description-container">
          <img class = "service-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/48d8ee2dc6769b0a06f1845c284f45e5ba63953e81a1e4928fe0cf213d03c6d3?apiKey=d22a939618da4e96809232126d1f951c&%27" alt="Service icon" />
          <h2 class = "service-description">Get email or SMS notifications for self-care reminders</h2>
        </div>
      </div>
      <div className = "services-right-column">
        <img class="service-image" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e608bf54bd9b92406a89b8ac000d68e68686a65d6a8e2921ba7d26cdc770ae57?apiKey=0cd5b3eb85e74a83a268d41d07a9c27f&&apiKey=0cd5b3eb85e74a83a268d41d07a9c27f" alt="OTC Medication Guidance" />
      </div>
    </div>
  </div>);
}

const DevReport = () => {
  
  const [devreportshow, setdevreportShow] = useState(false);
  const handleOpendevrep = () => setdevreportShow(true);
  const handleClosedevrep = () => setdevreportShow(false);
  return (
    <div className = "dev-report">
      <h1 className ="dev-report-title ">Found a bug?<br />Report it to the developers!</h1>
        <div className = "dev-report-button-box">
          <a className="dev-report-button" onClick={handleOpendevrep} role="button">REPORT</a>
        </div>
        
        <DevreportModal show={devreportshow} handleClose={handleClosedevrep} />
    </div>
    );
}

const Footer = () => {
  return (
    <div className = "landing-footer">
      <img className = "landing-footer-logo" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8a7c30444b5d585ef1ed03ec70f8b1de851d84fd4eeca6b699c6be680ced422?apiKey=d22a939618da4e96809232126d1f951c&" alt="BSDOC Logo" />
        <div className = "landing-footer-social-icons-container">
          <img className = "landing-footer-social-icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f65e1e4a0116b9054440b3c442f5f400866e9b6041c12ab676e2a5e89ce1f46?apiKey=d22a939618da4e96809232126d1f951c&" alt="Facebook" />
          <img className = "landing-footer-social-icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/15ddc2bd1d88737b19196340a0455ae0ac7994e7c9d6982d7cb430b35278903b?apiKey=d22a939618da4e96809232126d1f951c&" alt="Twitter" />
          <img className = "landing-footer-social-icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/02f2f683e624f2403b4fadcf3a81e2e79d8397bba42e91253ce111d1c3fc1b6b?apiKey=d22a939618da4e96809232126d1f951c&" alt="Instagram" />
          <img className = "landing-footer-social-icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/396fbc8c53bac13d70296b832373679518a0fec184c946d21026086d99777c1c?apiKey=d22a939618da4e96809232126d1f951c&" alt="LinkedIn" />
        </div>
        <h2 className = "landing-footer-text">Disclaimer: This service is for informational purposes only. Consult a doctor for persistent or worsening symptoms.</h2>
    </div>
  );
}
const App = () => {
  const [logoSrc, setLogoSrc] = useState('https://cdn.builder.io/api/v1/image/assets/TEMP/e8a7c30444b5d585ef1ed03ec70f8b1de851d84fd4eeca6b699c6be680ced422?apiKey=d22a939618da4e96809232126d1f951c&'); // Default logo
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      const heroSection = document.querySelector('.hero-section');
      const heroHeight = heroSection ? heroSection.offsetHeight : 0;
  
      if (window.scrollY > heroHeight) {
        header.classList.add('scrolled');
        } else {
        header.classList.remove('scrolled');
        setLogoSrc('https://cdn.builder.io/api/v1/image/assets/TEMP/e8a7c30444b5d585ef1ed03ec70f8b1de851d84fd4eeca6b699c6be680ced422?apiKey=d22a939618da4e96809232126d1f951c&'); // Default logo
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="landing-body">
      <Header isLandingPage={true} />
        <HeroSection />
        <div className = "blue-bar"/>
        <ServicesSection />
        <DevReport />
      <Footer />
    </div>
  );
};

export default App;