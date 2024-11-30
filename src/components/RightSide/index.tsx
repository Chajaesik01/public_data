
import React from 'react';
import styled from 'styled-components';
import Form from '../Form'
const RightSideContainer = styled.div`
  width: 50%; /* 너비 설정 */
  height: 100%; /* 부모 높이에 맞춤 */
  background-color: #f0f0f0; /* 배경색 설정 */
`;

const RightSide = () => {
  return (
    <RightSideContainer>
      <Form/>
    </RightSideContainer>
  );
}

export default RightSide;