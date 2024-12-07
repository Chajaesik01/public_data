// LeftSide.tsx
import React from 'react';
import styled from 'styled-components';
import Map from '../Map';

const LeftSideContainer = styled.div`
  width: 40%; /* 너비 설정 */
  height: 80%; /* 부모 높이에 맞춤 */
  margin-top: 2vh;
  margin-left: 8vw;
  margin-right: 10vw;
  background-color: #f0f0f0; /* 배경색 설정 */
`;

interface LeftSideProps {
  selectedFacility?: string; // 선택된 시설 주소
}

const LeftSide: React.FC<LeftSideProps> = ({ selectedFacility }) => {
  console.log(selectedFacility)
  return (
    <LeftSideContainer>
      <Map address={selectedFacility} />
    </LeftSideContainer>
  );
}

export default LeftSide;
