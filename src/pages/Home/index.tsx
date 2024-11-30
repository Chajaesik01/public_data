import React from 'react';
import styled from 'styled-components';
import { LeftSide, RightSide } from '../../components'
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh; 
  margin: 10vh 10vw; 
  border: 0.5px solid #000; 
`;

const Home = () => {
  return (
    <CenteredContainer>
      <LeftSide />
      <RightSide />
    </CenteredContainer>
  );
}

export default Home;
