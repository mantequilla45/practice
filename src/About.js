import React from 'react';
import './About.css';
import Header from './Header';

const AboutSection = () => (
  <section className="section-wrapper">
        <div className="two-column-layout">
          <div className="left-column">
            <div className="about-content">
              <h2 className="about-section-title">About Us</h2>
              <img className="divider" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2071cbb069a47bfc8447d5d33ed3d6a6a4f8525ebc9c9899508d16965058755?apiKey=d22a939618da4e96809232126d1f951c&" alt="Divider" />
              <h3 className="sub-title">Where Your Health Meets</h3>
              <h1 className="main-title">Innovation</h1>
              <p className="description" style={{ fontStyle: 'normal'}}>
                At BSDOC, our mission is to create innovative solutions that simplify and enhance personal health management. We aim to empower individuals with user-friendly tools to manage their health records and receive personalized suggestions for over-the-counter (OTC) medications. We envision a world where everyone has access to efficient, reliable, and easy-to-use health management platforms, leading to better self-care and improved communication with healthcare providers.
                <br /><br />
                Founded in 2024, VETT began with the development of the BSDOC project.
                <br />
                Our initial goal was to create an efficient and user-friendly platform that allows users to input their medical records, document symptoms,
                <br />
                and receive suggestions for OTC drugs and dosages based on their selected symptoms. Over time, we have expanded our offerings and improved
                <br />
                our platform to better serve our users' needs.
              </p>
            </div>
          </div>
          <div className="right-column">
            <img className="about-image" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee7badfced483aeb030d28a75ffdfa0b6cd0e1bd17d319ed9d7bef87a2fc07c8?apiKey=0cd5b3eb85e74a83a268d41d07a9c27f&" alt="About Us Illustration" />
          </div>
        </div>
  </section>
);

const WhatWeDoSection = () => (
  <section className="section-wrapper">
    <div className="two-column-layout">
      <div className="left-column">
        <img className="illustration-image" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4108a0a91d2b36009df074dff92655bcb9c4de2e3ff2b355eafcbdb064f7589e?apiKey=d22a939618da4e96809232126d1f951c&" alt="What We Do Illustration" />
      </div>
      <div className="right-column">
        <div className="description">
          <h1 className="main-title">What We Do</h1>
          <p className="description" style={{ fontStyle: 'normal'}}>
            <ul>
              <li>Picture of Users Interacting with Technology: Show users engaging with your platform, such as using a mobile app or computer.</li><br />
              <li>Healthcare Tools: Display images of digital health tools or icons representing different features of your platform.</li><br />
              <li>Simplified Healthcare Process: Illustrate how your platform simplifies health management, maybe through a flowchart or infographics.</li><br />
            </ul>
          </p>
        </div>
      </div>
    </div>
  </section>
);

const AcknowledgmentsSection = () => (
  <section className="section-wrapper">
    <h1 className="main-title" style={{ textAlign: 'center'}}>Acknowledgments</h1>
    <p className="acknowledgements" style={{ fontStyle: 'normal'}}>
      We extend our heartfelt gratitude to everyone who has contributed to the development and success of VETT.
      <br /><br />
      First and foremost, we thank our dedicated team whose relentless passion, creativity, and hard work have been the driving force behind our innovative health management solutions. Your commitment to excellence and user-centric design has been instrumental in bringing our vision to life.
      <br /><br />
      We are also deeply grateful to our early adopters and users. Your valuable feedback, trust, and support have been crucial in refining our platform and ensuring it meets the highest standards of usability and effectiveness.
      <br /><br />
      Special thanks go to our partners and advisors for their unwavering guidance and expertise. Your insights and collaboration have been invaluable in navigating the challenges and opportunities in the healthcare technology landscape.
      <br /><br />
      Lastly, we acknowledge the support of our families and friends. Your encouragement and belief in our mission have been a constant source of motivation and inspiration.
      <br /><br />
      Together, we are making a positive impact on personal health management, and we look forward to continuing this journey with all of you.
      <br /><br />
      Thank you.
    </p>
  </section>
);

const Footer = () => (
  <footer className="footer-wrapper">
    <div className="footer-content">
      <img className="footer-logo" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e81691a150ed559a750a83562972bb463f8ce5c6fc6f46b36b6df6cc8e29a15e?apiKey=d22a939618da4e96809232126d1f951c&" alt="BSDOC Logo" />
      <div className="social-icons">
        <img className="social-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f65e1e4a0116b9054440b3c442f5f400866e9b6041c12ab676e2a5e89ce1f46?apiKey=d22a939618da4e96809232126d1f951c&" alt="Social Icon 1" />
        <img className="social-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/15ddc2bd1d88737b19196340a0455ae0ac7994e7c9d6982d7cb430b35278903b?apiKey=d22a939618da4e96809232126d1f951c&" alt="Social Icon 2" />
        <img className="social-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/02f2f683e624f2403b4fadcf3a81e2e79d8397bba42e91253ce111d1c3fc1b6b?apiKey=d22a939618da4e96809232126d1f951c&" alt="Social Icon 3" />
        <img className="social-icon" loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/396fbc8c53bac13d70296b832373679518a0fec184c946d21026086d99777c1c?apiKey=d22a939618da4e96809232126d1f951c&" alt="Social Icon 4" />
      </div>
      <p className="disclaimer">
        Disclaimer: This service is for informational purposes only. Consult a doctor for persistent or worsening symptoms.
      </p>
    </div>
  </footer>
);

const App = () => (
  <body class="about-body">
  <div>
    <div className="top-banner-container">
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/edd13ab24828baf3f98ccfa3c20227a156a3a382d266c2869478fa87940be426?apiKey=0cd5b3eb85e74a83a268d41d07a9c27f&" 
        alt="Top Banner" 
        className="top-banner" 
      />
    </div>
    <Header isAboutPage={true} />
    <div className="content-wrapper">
      <AboutSection />
      <WhatWeDoSection />
      <AcknowledgmentsSection />
      <Footer />
    </div>
  </div>
  </body>
);

export default App;
