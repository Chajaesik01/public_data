import React from 'react';

interface DisabilityTypeFilterProps {
  selectedDisabilityType: string;
  setSelectedDisabilityType: React.Dispatch<React.SetStateAction<string>>;
}

const DisabilityTypeFilter: React.FC<DisabilityTypeFilterProps> = ({ selectedDisabilityType, setSelectedDisabilityType }) => {
  return (
    <select value={selectedDisabilityType} onChange={e => setSelectedDisabilityType(e.target.value)}>
      <option value="">모든 장애인 유형</option>
      <option value="발달(지적/자폐)장애">발달(지적/자폐)장애</option>
      <option value="지체(척수 및 절단 및 기타)장애">지체(척수 및 절단 및 기타)장애</option>
      <option value="청각장애">청각장애</option>
      <option value="시각장애">시각장애</option>
      <option value="기타장애">기타장애</option>
      <option value="뇌병변장애">뇌병변장애</option>
    </select>
  );
};

export default DisabilityTypeFilter;
