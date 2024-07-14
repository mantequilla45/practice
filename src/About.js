import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header'


const SectionWrapper = styled.section`
  align-items: center;
  display: flex;
  width: 100%;
  padding-top: 75px;
  flex-direction: column;
  padding: 80px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding: 0 20px;
  }
`;

const ContentContainer = styled.div`
 
  padding-left: 60px;
  display: flex;
  width: 100%;
  max-width: 1780px;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const FlexContainer = styled.div`
  margin: 0 48px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-right: 10px;
  }
`;

const TwoColumnLayout = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 60%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 50%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-grow: 1;
  margin-left: 70px;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const SectionTitle = styled.h2`
  color: #0d3a90;
  align-self: centers;
  font: 30px Rubik, sans-serif;
`;

const Divider = styled.img`
  aspect-ratio: 60;
  object-fit: auto;
  object-position: center;
  width: 130px;
  stroke-width: 5px;
  stroke: rgba(118, 199, 206, 0.5);
  max-width: 100%;
`;

const SubTitle = styled.h3`
  color: #000;
  margin-top: 20px;
  font: 25px Rubik, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const MainTitle = styled.h1`
  color: #043caa;
  font: 500 75px Rubik, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
  }
`;

const Description = styled.p`
  color: #575454;
  text-align: justify;
  margin-top: 39px;
  max-width: 90%;
  font: italic 200 18px Rubik, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AboutImage = styled.img`
  object-fit: auto;
  object-position: center;
  width: 90%;
  background-color: rgba(255, 255, 255, 1);
  max-width: 80%;
  margin-left: 30px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;
const IllustrationImage = styled.img`
  width: 90%;
  background-color: rgba(255, 255, 255, 1);
  max-width: 796px;
  margin-left: 26px;
  margin-top: -180px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Acknowledgements = styled.p`
  color: #575454;
  width: 80%;
  font: italic 200 18px Rubik, sans-serif;
  margin: 39px auto;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const FooterWrapper = styled.footer`
  justify-content: center;
  align-items: start;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  background-color: #04276a;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px 60px 17px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;


const FooterContent = styled.div`
  display: flex;
  margin-left: 114px;
  width: 978px;
  max-width: 100%;
  flex-direction: column;
  align-items: start;
`;

const FooterLogo = styled.img`
  aspect-ratio: 3.7;
  object-fit: auto;
  object-position: center;
  width: 206px;
  max-width: 100%;
`;

const SocialIcons = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 21px;
  gap: 8px;
`;

const SocialIcon = styled.img`
  aspect-ratio: 1.08;
  object-fit: auto;
  object-position: center;
  width: 56px;
`;

const Disclaimer = styled.p`
  color: #ccc;
  align-self: stretch;
  margin-top: 38px;
  font: 400 18px Rubik, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
const AboutSection = () => (
  <SectionWrapper>
    <ContentContainer>
      <FlexContainer>
        <TwoColumnLayout>
          <LeftColumn>
            <AboutContent>
              <SectionTitle>About Us</SectionTitle>
              <Divider loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2071cbb069a47bfc8447d5d33ed3d6a6a4f8525ebc9c9899508d16965058755?apiKey=d22a939618da4e96809232126d1f951c&" alt="Divider" />
              <SubTitle>Where Your Health Meets</SubTitle>
              <MainTitle>Innovation</MainTitle>
              <Description>
                At BSDOC, our mission is to create innovative solutions that simplify and enhance personal health management. We aim to empower individuals with user-friendly tools to manage their health records and receive personalized suggestions for over-the-counter (OTC) medications. We envision a world where everyone has access to efficient, reliable, and easy-to-use health management platforms, leading to better self-care and improved communication with healthcare providers.
                <br /><br />
                Founded in 2024, VETT began with the development of the BSDOC project.
                <br />
                Our initial goal was to create an efficient and user-friendly platform that allows users to input their medical records, document symptoms,
                <br />
                and receive suggestions for OTC drugs and dosages based on their selected symptoms. Over time, we have expanded our offerings and improved
                <br />
                our platform to better serve our users' needs.
              </Description>
            </AboutContent>
          </LeftColumn>
          <RightColumn>
            <AboutImage loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7032c94fcba7e096250c9ddbbb838720a063a873c6812c47f2b7f9551073e6fc?apiKey=d22a939618da4e96809232126d1f951c&" alt="About Us Illustration" />
          </RightColumn>
        </TwoColumnLayout>
      </FlexContainer>
    </ContentContainer>
  </SectionWrapper>
);

const WhatWeDoSection = () => (
  <SectionWrapper>
    <TwoColumnLayout>
      <LeftColumn>
        <IllustrationImage loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4108a0a91d2b36009df074dff92655bcb9c4de2e3ff2b355eafcbdb064f7589e?apiKey=d22a939618da4e96809232126d1f951c&" alt="What We Do Illustration" />
      </LeftColumn>
      <RightColumn>
        <ContentWrapper>
          <MainTitle>What We Do</MainTitle>
          <Description>
            <ul>
              <li>Picture of Users Interacting with Technology: Show users engaging with your platform, such as using a mobile app or computer.</li><br />
              <li>Healthcare Tools: Display images of digital health tools or icons representing different features of your platform.</li><br />
              <li>Simplified Healthcare Process: Illustrate how your platform simplifies health management, maybe through a flowchart or infographics.</li><br />
            </ul>
          </Description>
        </ContentWrapper>
      </RightColumn>
    </TwoColumnLayout>
  </SectionWrapper>
);

const AcknowledgmentsSection = () => (
  <SectionWrapper>
    <MainTitle style={{ textAlign: 'center' }}>Acknowledgments</MainTitle>
    <Acknowledgements>
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
    </Acknowledgements>
  </SectionWrapper>
);

const Footer = () => (
  <FooterWrapper>
    <FooterContent>
      <FooterLogo loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e81691a150ed559a750a83562972bb463f8ce5c6fc6f46b36b6df6cc8e29a15e?apiKey=d22a939618da4e96809232126d1f951c&" alt="BSDOC Logo" />
      <SocialIcons>
        <SocialIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f65e1e4a0116b9054440b3c442f5f400866e9b6041c12ab676e2a5e89ce1f46?apiKey=d22a939618da4e96809232126d1f951c&" alt="Social Icon 1" />
        <SocialIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/15ddc2bd1d88737b19196340a0455ae0ac7994e7c9d6982d7cb430b35278903b?apiKey=d22a939618da4e96809232126d1f951c&" alt="Social Icon 2" />
        <SocialIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/02f2f683e624f2403b4fadcf3a81e2e79d8397bba42e91253ce111d1c3fc1b6b?apiKey=d22a939618da4e96809232126d1f951c&" alt="Social Icon 3" />
        <SocialIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/396fbc8c53bac13d70296b832373679518a0fec184c946d21026086d99777c1c?apiKey=d22a939618da4e96809232126d1f951c&" alt="Social Icon 4" />
      </SocialIcons>
      <Disclaimer>
        Disclaimer: This service is for informational purposes only. Consult a doctor for persistent or worsening symptoms.
      </Disclaimer>
    </FooterContent>
  </FooterWrapper>
);


const ContentWrapper = styled.div`
  position: relative;
  z-index: 1; 
  background-color: #FFFFFF;
`;
const StyledBackground = styled.div`
  background-image: url('https://cdn.builder.io/api/v1/image/assets/TEMP/edd13ab24828baf3f98ccfa3c20227a156a3a382d266c2869478fa87940be426?apiKey=d22a939618da4e96809232126d1f951c&');
  background-size: cover;
  background-position: center;
  position: fixed; 
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  z-index: -1; 
`;
const App = () => (
  <div>
    <Header />
    <ContentWrapper>
      <AboutSection />
      <WhatWeDoSection />
      <AcknowledgmentsSection />
      <Footer />
    </ContentWrapper>
  </div>
);

export default App;
