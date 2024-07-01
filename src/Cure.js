import React from "react"; 
import styled from "styled-components";

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 80px 20px 0px;
    margin-left: 80px;
    background-color: #F1F1F3;
    width: auto%;
    @media (max-width: 991px) {
    padding: 20px;
        flex-wrap: wrap;
    }
`;

const Logo = styled.img`
    width: 151px;
    height: auto;
    margin-right:-400px;
`;

const Nav = styled.nav`
    display: flex;
    gap: 20px;
    padding-right: 0px;
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

const MainContent = styled.main`
    display: flex;
    gap: 20px;
    width: auto;
    max-height: 1080px;
    margin: 20px 0px 0px 0px;
    padding: 0 200px;
    background-color: #F1F1F3;
    margin-top: -64px;
    @media (max-width: 991px) {
        flex-direction: column;
        padding: 0 20px;
    }
`;

const HeroSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    @media (max-width: 991px) {
        width: 100%;
        margin-top: 40px;
    }
`;

const HeroTitle = styled.h1`
    color: #333;
    padding-top: 138px;
    margin-top:150px;
    font: 75px Rubik, sans-serif;
    @media (max-width: 991px) {
        font-size: 40px;
    }
`;

const HeroDescription = styled.p`
    color: #786d6d;
    font: 19px Rubik, sans-serif;
    margin-top: 189px;
    @media (max-width: 991px) {
        margin-top: 40px;
    }
`;
const BackgroundImage = styled.img`
    display: flex;
    margin-top: 63px;
    margin-left: -15  px;
    width: 63%;
    height: 100%;
    object-fit: cover;
`;

const SearchSection = styled.section`
    position: relative;
    width: 900px;
    min-height: 973px;
    display: flex;
    margin-left: -1200px;
    align-items: center;
    justify-content: center;
    @media (max-width: 991px) {
      width: 100%;
      margin-top: 40px;
    }
`;



const SearchForm = styled.form`
  display: flex;
  max-width: 500px;
  margin-top: 39px;
  @media (max-width: 991px) {
    margin-top: 40px;
    flex-wrap: wrap;
  }
`;

const SearchInput = styled.input`
  border-radius: 10px 0 0 10px;
  background-color: rgba(255, 255, 255, 0.9);
  max-width: 412px;
  margin-left:-900px;
  height: 88px;
  border: none;
  padding: 0 20px;
  font-size: 19px;
  font-family: Rubik, sans-serif;
`;

const SearchButtonText = styled.h1`
font-size: 19px;
font-family: Rubik, sans-serif;
`;
const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #97c252;
  border: none;
  border-radius: 0 10px 10px 0;
  width: 25 0px;
  height: 88px;
  cursor: pointer;
`;

const SearchIcon = styled.img`
  width: 26px;
  height: 26px;
`;

function App() {
  return (
    <>
      <Header>
        <NavLink href="#" className="underline">About</NavLink>
        <Logo src="https://cdn.builder.io/api/v1/image/assets/TEMP/16d9e73da749028535b483d8ace7f27155660c5f575d746c967a83d4b5ac0d87?apiKey=d22a939618da4e96809232126d1f951c&" alt="BSDOC Logo" />
        <Nav>
          <NavSchedLink href="#">Schedule an appointment</NavSchedLink>
          <Button>Log in</Button>
          <Button>Sign Up</Button>
        </Nav>
      </Header>
      <MainContent>
        <HeroSection>
          <HeroTitle>Welcome to BSDOC</HeroTitle>
          <HeroDescription>Introducing a new way to diagnose your sickness.</HeroDescription>
        </HeroSection>
        <BackgroundImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe2f0a109be8118d3d4f82e0383523128dd7d2ba1fecff3c0d628cd098876def?apiKey=d22a939618da4e96809232126d1f951c&" alt="Background" />
        
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
        </MainContent>
    </>
  );
}

export default App;