import React from 'react';
import styled from 'styled-components';

interface RegionFilterProps {
  selectedRegion: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
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
    margin-left:10px;
    margin-bottom: 20px;
    &:focus {
        border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
        outline: none; /* 포커스 시 기본 테두리 제거 */
    }
        @media (max-width: 768px) {
        margin-top: 10px;
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
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRegion(e.target.value); // 부모 컴포넌트의 상태 업데이트
    };

    return (
        <StyledSelect value={selectedRegion} onChange={handleChange}> {/* 변경 시 핸들러 호출 */}
            <option value="">지역을 선택하세요</option>
            <option value="대구광역시">대구광역시</option>
            <option value="경기도">경기도</option>
            <option value="경상남도">경상남도</option>
            <option value="경상북도">경상북도</option>
            <option value="충청북도">충청북도</option>
            <option value="대전광역시">대전광역시</option>
            <option value="인천광역시">인천광역시</option>
            <option value="충청남도">충청남도</option>
            <option value="울산광역시">울산광역시</option>
            <option value="서울특별시">서울특별시</option>
            <option value="전라북도">전라북도</option>
            <option value="부산광역시">부산광역시</option>
            <option value="광주광역시">광주광역시</option>
            <option value="전라남도">전라남도</option>
            <option value="전북특별자치도">전북특별자치도</option>
            <option value="강원특별자치도">강원특별자치도</option>
            <option value="제주특별자치도">제주특별자치도</option>
            <option value="세종특별자치시">세종특별자치시</option>
            <option value="강원도">강원도</option>
        </StyledSelect>
    );
};

export default RegionFilter;
