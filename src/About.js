import React from 'react';
import styled from 'styled-components';
import Header from './About';
import Footer from './About';

const Main = styled.main`
  width: 100%;
  max-width: 1780px;
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const App = () => (
  <AppWrapper>
    <Header />
    <Main>
      {/* Insert components here */}
    </Main>
    <Footer />
  </AppWrapper>
);

export default App;
