import React from 'react';
import ActivityFilter from '../ActivityFilter';
import RegionFilter from '../RegionFilter';

interface FilterProps {
  selectedActivity: string;
  setSelectedActivity: React.Dispatch<React.SetStateAction<string>>;
  selectedRegion: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
}

const Filter: React.FC<FilterProps> = ({
  selectedActivity,
  setSelectedActivity,
  selectedRegion,
  setSelectedRegion,
}) => {
  return (
    <div>
      <h2>필터 선택</h2>
      <ActivityFilter
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
      />
      <RegionFilter
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    </div>
  );
};

export default Filter;
