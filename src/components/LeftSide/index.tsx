// LeftSide.tsx
import React from 'react';
import styled from 'styled-components';
import Map from '../Map';
const LeftSideContainer = styled.div`
  width: 50%; /* 너비 설정 */
  height: 100%; /* 부모 높이에 맞춤 */
  background-color: #f0f0f0; /* 배경색 설정 */
`;

const LeftSide = () => {
  return (
    <LeftSideContainer>
      <Map/>
    </LeftSideContainer>
  );
}

export default LeftSide;