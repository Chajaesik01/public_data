import React from 'react';
import styled from 'styled-components';

interface RegionFilterProps {
  selectedRegion: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
}

// Styled select component
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

@media (max-width: 768px) {
    display: flex;
    max-width: 70vw;
    min-width: 150px; /* 모바일에서 최소 너비 조정 */
    max-height: 35px; /* 모바일에서 높이 조정 */
    font-size: 24px; /* 모바일에서 글자 크기 조정 */
    padding: 0 8px; /* 모바일에서 패딩 조정 */
    margin: 0 auto; /* 중앙 정렬을 위한 자동 여백 설정 */
}

`;


const RegionFilter: React.FC<RegionFilterProps> = ({ selectedRegion, setSelectedRegion }) => {
  return (
    <StyledSelect value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
      <option value="">지역을 선택하세요</option>
      <option value="대전">대전</option>
      <option value="경기">경기</option>
      <option value="인천">인천</option>
      <option value="서울">서울</option>
      <option value="제주">제주</option>
      <option value="대구">대구</option>
      <option value="충남">충남</option>
      <option value="충북">충북</option>
      <option value="경북">경북</option>
      <option value="전북">전북</option>
      <option value="세종">세종</option>
      <option value="강원">강원</option>
      <option value="울산">울산</option>
      <option value="전남">전남</option>
      <option value="광주">광주</option>
      <option value="부산">부산</option>
      <option value="경남">경남</option>
    </StyledSelect>
  );
};

export default RegionFilter;
