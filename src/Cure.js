import React from "react"; 
import styled from "styled-components";
import Login from "./Login";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 80px 20px 80px;
  background-color: #F1F1F3;
  width: auto;
  @media (max-width: 991px) {
  padding: 20px;
    flex-wrap: wrap;
  }
`;

const Logo = styled.img`
  width: 151px;
  height: auto;
  margin-right:-390px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a`
  color: #333;
  font-family: Rubik, sans-serif;
  font-size: 19px;
  text-decoration: none;
`;

const NavSchedLink = styled.a`
  font-family: Rubik, sans-serif;
  font-size: 15px;
  color: #000;
  display: flex;
  align-items: center; 
  text-decoration: underline;
`;

const Button = styled.button`
  font-family: Rubik, sans-serif;
  font-size: 15px;
  color: #000;
  margin-left: 100;
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
const BackgroundImage = styled.img`
  margin-left: 50%;
  width: 50%;
  height: 858px;
  object-fit: cover;
`;
const MainContent = styled.main`
  display: flex;
  gap: 20px;
  
  margin-top:-950px;
  padding: 200px 200px 410px 200px;
  background-color: #F1F1F3;
  @media (max-width: 991px) {
    flex-direction: column;
    padding: 0 20px;
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150%;
  padding-right: 30%;
  @media (max-width: 991px) {
    width: 100%;
    margin-top: 40px;
  }
`;

const HeroTitle = styled.h1`
  color: #333;
  margin-left: 100px;
  margin-right: 100px;
  font: 60px Rubik, sans-serif;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const HeroDescription = styled.p`
  color: #786d6d;
  margin-top: 40px;
  margin-left: 100px;
  font: 18px Rubik, sans-serif;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;
const SearchSection = styled.section`
  display: flex;
  width: 143%;
  justify-content: center;
  align-items: center;
  margin-top: -2.5%;
  margin-left: 100px;
  align-items: center;
  border-radius: 10px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;



const SearchForm = styled.form`
  display: flex;
  width: 100%;
  margin-top: 40px;
  @media (max-width: 991px) {
    margin-top: 40px;
    flex-wrap: wrap;
  }
`;

const SearchInput = styled.input`
  border-radius: 10px 0 0 10px;
  background-color: #fff;
  width: 64.5%;
  height: 75px;
  
  border: none;
  padding: 0 20px;
  font-size: 19px;
  font-family: Rubik, sans-serif;
  color: #545252;

  &::placeholder {
    color: #A5A5A5;
  }
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #B4DE71;
  border: none;
  border-radius: 0 10px 10px 0;
  width: 300px;
  height: 75px;
  cursor: pointer;
`;

const SearchButtonText = styled.h1`
  font-family: Rubik, sans-serif;
  color: #545252;
  font-size: 15px;
  margin-left: -20px;
  padding-right: 30px;
  font-weight: normal;
`;

const SearchIcon = styled.img`
  margin-right: -80px;
  width: 75px;
  height: 15px;
`;


function App() {
  return (
    <>
      <Header>
        <NavLink href="#" className="underline">About</NavLink>
        <Logo src="https://cdn.builder.io/api/v1/image/assets/TEMP/16d9e73da749028535b483d8ace7f27155660c5f575d746c967a83d4b5ac0d87?apiKey=d22a939618da4e96809232126d1f951c&" alt="BSDOC Logo" />
        <Nav>
          <NavSchedLink href="/bookschedule">Schedule an appointment</NavSchedLink>
          <Login></Login>
          <Button>Sign Up</Button>
        </Nav>
      </Header>
      <BackgroundImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe2f0a109be8118d3d4f82e0383523128dd7d2ba1fecff3c0d628cd098876def?apiKey=d22a939618da4e96809232126d1f951c&" alt="Background" />
      <MainContent>
        <HeroSection>
          <HeroTitle>Welcome to BSDOC</HeroTitle>
            <SearchSection>
            <SearchForm>
            <SearchInput
                type="text"
                id="symptomSearch"
                placeholder="Type symptom here."
                aria-label="Type symptom here."
              />
              <SearchButton type="submit" aria-label="Search">
                <SearchButtonText href="#">Search Symptom</SearchButtonText>
                <SearchIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/b58ee50fb2d2388824c311d90e981de513f2169502c99f9030074d05ffd099b8?apiKey=d22a939618da4e96809232126d1f951c&" alt="Search Icon" />
              </SearchButton>
            </SearchForm>
          </SearchSection>
          <HeroDescription>Introducing a new way to diagnose your sickness.</HeroDescription>
        </HeroSection>
        </MainContent>
        
    </>
  );
}

export default App;