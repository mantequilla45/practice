import React, { useEffect,useState } from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1.05% 3.15%;
  position: fixed;
  top: 0;
  left: 0;
  margin-right: 50%;
  padding-right: 20%;
  width: 100%;
  z-index: 1000; 
  transition: background-color 0.3s ease;
  @media (max-width: 991px) {
    padding: 20px;
  }
  &.scrolled {
    background-color: #B9F2FF; 
  }
`;

const Logo = styled.img`
  width: 150px;
  margin-top: -10px;
  height: auto;
  transition: opacity 0.3s ease;
`;

const Nav = styled.nav`
  display: flex;
  margin-left: 62.75%; /* This ensures the Nav is pushed to the right */
  gap: 20px;
`;

const NavLink = styled.a`
  font-family: Rubik, sans-serif;
  font-size: 15px;
  color: #000;
  text-decoration: underline;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  font-family: Rubik, sans-serif;
  font-size: 15px;
  color: #000;
  font-weight: bold;
  background-color: #fff;
  border: 1px solid rgba(137, 137, 137, 1);
  border-radius: 50px;
  padding: 15px 30px;
  cursor: pointer;
  @media (max-width: 991px) {
    padding: 15px 20px;
  }
`;


const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 60px;
  background-image: url('https://cdn.builder.io/api/v1/image/assets/TEMP/b8264c956da39a9e61a99d5a500ed437bde969081f7c185f4a9c5608ea82968c?apiKey=d22a939618da4e96809232126d1f951c&');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 1080px) {
    flex-direction: column;
    padding: 40px 20px;
  }
`;

const HeroContent = styled.div`
  width: 50%;
  @media (max-width: 1080px) {
    width: 100%;
    text-align: center;
    padding-left: 0;
  }
`;

const HeroTitle = styled.h1`
  font-family: Rubik, sans-serif;
  font-size: 60px;
  font-weight: bold;
  color: #fff;
  width: 900px;
  margin-top: -200px;
  margin-left: 195px;
  @media (max-width: 1080px) {
    font-size: 40px;
  }
`;

const HeroDescription = styled.p`
  font-family: Rubik, sans-serif;
  font-size: 19px;
  font-weight: regular;
  color: #fff;
  margin-left: 200px;
  margin-top: -30px;
`;

const CtaButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.8);
  width: 790px; 
  height: 80px; 
  color: #000;
  border-radius: 10px;
  margin-left: 200px;
  font-size: 20px;
  font-weight: normal;
  margin-top: 50px;
`;

const HeroImage = styled.img`
  width: 40%;
  height: auto;
  margin-top: 100px;
  margin-bottom: -80px;
  @media (max-width: 1080px) {
    width: 100%;
    margin-top: 40px;
  }
`;

const ServicesSection = styled.section`
  padding: 80px 60px;
  background-color: #fff;
  @media (max-width: 991px) {
    padding: 40px 20px;
  }
`;

const SectionTitle = styled.h2`
  font-family: Rubik, sans-serif;
  font-size: 75px;
  font-weight: 600;
  color: #043caa;
  text-align: center;
  margin-bottom: 40px;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const ServiceCard = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const ServiceContent = styled.div`
  width: 45%;
  @media (max-width: 991px) {
    width: 100%;
    order: 2;
  }
`;

const ServiceTitle = styled.h3`
  font-family: Rubik, sans-serif;
  font-size: 35px;
  color: #043caa;
  margin-bottom: 20px;
`;

const ServiceFeature = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const FeatureIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 20px;
`;

const FeatureText = styled.p`
  font-family: Rubik, sans-serif;
  font-size: 25px;
  color: #333;
`;

const ServiceImage = styled.img`
  width: 50%;
  height: auto;
  @media (max-width: 991px) {
    width: 100%;
    order: 1;
    margin-bottom: 40px;
  }
`;

const AppointmentSection = styled.section`
  background: linear-gradient(180deg, #0d3a90 0%, #093181 48.16%, #04276a 96.32%);
  padding: 60px;
  color: #fff;
  @media (max-width: 991px) {
    padding: 40px 20px;
  }
`;

const AppointmentTitle = styled.h2`
  font-family: Rubik, sans-serif;
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 20px;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const AppointmentButton = styled(Button)`
  background-color: #ed5050;
  color: #000;
  font-weight: 500;
  padding: 14px 24px;
`;

const Footer = styled.footer`
  background-color: #04276a;
  padding: 40px 60px;
  color: #ccc;
  @media (max-width: 991px) {
    padding: 40px 20px;
  }
`;

const FooterLogo = styled(Logo)`
  margin-bottom: 20px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const SocialIcon = styled.img`
  width: 56px;
  height: 56px;
`;

const FooterText = styled.p`
  font-family: Rubik, sans-serif;
  font-size: 18px;
`;

const App = () => {
  const services = [
    {
      title: "Interactive Symptom Checker",
      features: [
        "Input symptoms to find the right cure",
        "Search results are filtered according to the symptoms",
        "Visual aids and explanations to help users understand their symptoms better"
      ],
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/98d0a172276bdd53d7c7e18fac89276cb34e5c8e7dd23c00ca291ca84b43b13b?apiKey=d22a939618da4e96809232126d1f951c&"
    },
    {
      title: "OTC Medication Guidance",
      features: [
        "Find the right over-the-counter medications based on your symptoms",
        "Access information on uses, dosages, and precautions for common OTC medications",
        "Be informed about potential drug interactions and contraindications"
      ],
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1b5004247f7fbd1c8b0f084d804e71e9457c218ddca3ddf8817253a57b27bacd?apiKey=d22a939618da4e96809232126d1f951c&"
    },
    {
      title: "Personalized Health Tips",
      features: [
        "Receive health and wellness tips based on your profile and symptom history",
        "Save and track your health data over time",
        "Get email or SMS notifications for self-care reminders"
      ],
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/87b0ca09f0388b96aef8a339564bcf3e73b6be4efcc568a134cff5304330f183?apiKey=d22a939618da4e96809232126d1f951c&"
    }
  ];
  const [logoSrc, setLogoSrc] = useState('https://cdn.builder.io/api/v1/image/assets/TEMP/e8a7c30444b5d585ef1ed03ec70f8b1de851d84fd4eeca6b699c6be680ced422?apiKey=d22a939618da4e96809232126d1f951c&'); // Default logo

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      const heroSection = document.querySelector('.hero-section');
      const heroHeight = heroSection ? heroSection.offsetHeight : 0;
  
      if (window.scrollY > heroHeight) {
        header.classList.add('scrolled');
        setLogoSrc('https://cdn.builder.io/api/v1/image/assets/TEMP/16d9e73da749028535b483d8ace7f27155660c5f575d746c967a83d4b5ac0d87?apiKey=d22a939618da4e96809232126d1f951c&'); // Logo when scrolled
      } else {
        header.classList.remove('scrolled');
        setLogoSrc('https://cdn.builder.io/api/v1/image/assets/TEMP/e8a7c30444b5d585ef1ed03ec70f8b1de851d84fd4eeca6b699c6be680ced422?apiKey=d22a939618da4e96809232126d1f951c&'); // Default logo
      }
    };
    
    window.addEventListener('scroll', handleScroll);
  
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <Header>
        <Logo src={logoSrc} alt="BSDOC Logo" />
        <Nav>
          <NavLink href="/bookschedule">Schedule an appointment</NavLink>
          <Button>Log in</Button>
          <Button>Sign Up</Button>
        </Nav>
      </Header>

      <main>
        <HeroSection>
          <HeroContent>
            <HeroTitle>Your Personal Guide to Self-Care for Common Ailments</HeroTitle>
            <HeroDescription>Take control of your health, save time, and find relief at home with BSDOC.</HeroDescription>
            <a href="/cure"><CtaButton>FIND A CURE</CtaButton></a>
          </HeroContent>
          <HeroImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/9468847953b0a85498a7e4923ce907b1b96635871ec8b8cb0ce26f0ea148ca47?apiKey=d22a939618da4e96809232126d1f951c&" alt="Self-care illustration" />
        </HeroSection>

        <ServicesSection>
          <SectionTitle>Our Services</SectionTitle>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceContent>
                <ServiceTitle>{service.title}</ServiceTitle>
                {service.features.map((feature, featureIndex) => (
                  <ServiceFeature key={featureIndex}>
                    <FeatureIcon src={`http://b.io/ext_${featureIndex + 4}-`} alt="" />
                    <FeatureText>{feature}</FeatureText>
                  </ServiceFeature>
                ))}
              </ServiceContent>
              <ServiceImage src={service.image} alt={`${service.title} illustration`} />
            </ServiceCard>
          ))}
        </ServicesSection>

        <AppointmentSection>
          <AppointmentTitle>Not a common ailment?<br />Book a doctor's appointment!</AppointmentTitle>
          <a href="/bookschedule"><AppointmentButton>BOOK</AppointmentButton></a>
        </AppointmentSection>
      </main>

      <Footer>
        <FooterLogo src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8a7c30444b5d585ef1ed03ec70f8b1de851d84fd4eeca6b699c6be680ced422?apiKey=d22a939618da4e96809232126d1f951c&" alt="BSDOC Logo" />
        <SocialIcons>
          <SocialIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f65e1e4a0116b9054440b3c442f5f400866e9b6041c12ab676e2a5e89ce1f46?apiKey=d22a939618da4e96809232126d1f951c&" alt="Facebook" />
          <SocialIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/15ddc2bd1d88737b19196340a0455ae0ac7994e7c9d6982d7cb430b35278903b?apiKey=d22a939618da4e96809232126d1f951c&" alt="Twitter" />
          <SocialIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/02f2f683e624f2403b4fadcf3a81e2e79d8397bba42e91253ce111d1c3fc1b6b?apiKey=d22a939618da4e96809232126d1f951c&" alt="Instagram" />
          <SocialIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/396fbc8c53bac13d70296b832373679518a0fec184c946d21026086d99777c1c?apiKey=d22a939618da4e96809232126d1f951c&" alt="LinkedIn" />
        </SocialIcons>
        <FooterText>Disclaimer: This service is for informational purposes only. Consult a doctor for persistent or worsening symptoms.</FooterText>
      </Footer>
    </>
  );
};

export default App;