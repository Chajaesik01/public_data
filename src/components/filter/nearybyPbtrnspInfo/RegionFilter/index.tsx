import React from 'react';

interface RegionFilterProps {
  selectedRegion: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
}

const RegionFilter: React.FC<RegionFilterProps> = ({ selectedRegion, setSelectedRegion }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRegion(e.target.value); // 부모 컴포넌트의 상태 업데이트
    };

    return (
        <select value={selectedRegion} onChange={handleChange}> // 변경 시 핸들러 호출
            <option value="">모든 지역</option>
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
        </select>
    );
};

export default RegionFilter;
