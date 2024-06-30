import React from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 80px 20px 93px;
  background-color: #f1f1f3;
  @media (max-width: 991px) {
    padding: 20px;
    flex-wrap: wrap;
  }
`;

const Logo = styled.img`
  width: 151px;
  height: auto;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

const NavLink = styled.a`
  color: #333;
  font-family: Rubik, sans-serif;
  font-size: 19px;
  text-decoration: none;
  &.underline {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  font-family: Rubik, sans-serif;
  font-size: 19px;
  color: #000;
  background-color: #fff;
  border: 1px solid #898989;
  border-radius: 50px;
  padding: 21px 45px;
  cursor: pointer;
  @media (max-width: 991px) {
    padding: 15px 20px;
  }
`;

const MainContent = styled.main`
  display: flex;
  gap: 20px;
  max-width: 2045px;
  margin: 4px auto 8px;
  padding: 0 80px;
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

const SearchSection = styled.section`
  position: relative;
  width: 50%;
  min-height: 973px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) {
    width: 100%;
    margin-top: 40px;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  width: 100%;
  max-width: 412px;
  height: 88px;
  border: none;
  padding: 0 20px;
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
  width: 88px;
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
          <NavLink href="#">Schedule an appointment</NavLink>
          <Button>Log in</Button>
          <Button>Sign Up</Button>
        </Nav>
      </Header>
      <MainContent>
        <HeroSection>
          <HeroTitle>Welcome to BSDOC</HeroTitle>
          <HeroDescription>Introducing a new way to diagnose your sickness.</HeroDescription>
        </HeroSection>
        <SearchSection>
          <BackgroundImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe2f0a109be8118d3d4f82e0383523128dd7d2ba1fecff3c0d628cd098876def?apiKey=d22a939618da4e96809232126d1f951c&" alt="Background" />
          <SearchForm>
            <label htmlFor="symptomSearch" className="visually-hidden">Search Symptom</label>
            <SearchInput
              type="text"
              id="symptomSearch"
              placeholder="Search Symptom"
              aria-label="Search Symptom"
            />
            <SearchButton type="submit" aria-label="Search">
              <SearchIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/b58ee50fb2d2388824c311d90e981de513f2169502c99f9030074d05ffd099b8?apiKey=d22a939618da4e96809232126d1f951c&" alt="Search Icon" />
            </SearchButton>
          </SearchForm>
        </SearchSection>
      </MainContent>
    </>
  );
}

export default App;