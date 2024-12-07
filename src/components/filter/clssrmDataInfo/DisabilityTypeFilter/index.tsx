import React from 'react';
import styled from 'styled-components';

interface DisabilityTypeFilterProps {
  selectedDisabilityType: string;
  setSelectedDisabilityType: React.Dispatch<React.SetStateAction<string>>;
}

// Styled select component
const StyledSelect = styled.select`
    min-width: 200px; /* 최소 너비 설정 */
    max-height: 40px; /* 고정 높이 설정 */
    padding: 0 10px; /* 수평 패딩만 추가 */
    border: 1px solid #ccc; /* 테두리 색상 */
    border-radius: 4px; /* 모서리 둥글게 */
    font-size: 32px; /* 글자 크기 */
    color: #333; /* 글자 색상 */
    background-color: white; /* 배경색 */
    
    &:focus {
        border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
        outline: none; /* 포커스 시 기본 테두리 제거 */
    }
`;

const DisabilityTypeFilter: React.FC<DisabilityTypeFilterProps> = ({ selectedDisabilityType, setSelectedDisabilityType }) => {
  return (
    <StyledSelect value={selectedDisabilityType} onChange={e => setSelectedDisabilityType(e.target.value)}>
      <option value="">장애인 유형을 선택하세요</option>
      <option value="발달(지적/자폐)장애">발달(지적/자폐)장애</option>
      <option value="지체(척수 및 절단 및 기타)장애">지체(척수 및 절단 및 기타)장애</option>
      <option value="청각장애">청각장애</option>
      <option value="시각장애">시각장애</option>
      <option value="기타장애">기타장애</option>
      <option value="뇌병변장애">뇌병변장애</option>
    </StyledSelect>
  );
};

export default DisabilityTypeFilter;
