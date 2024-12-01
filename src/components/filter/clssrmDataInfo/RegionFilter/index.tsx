import React from 'react';

interface RegionFilterProps {
  selectedRegion: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
}

const RegionFilter: React.FC<RegionFilterProps> = ({ selectedRegion, setSelectedRegion }) => {
  return (
    <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
      <option value="">모든 지역</option>
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
    </select>
  );
};

export default RegionFilter;
