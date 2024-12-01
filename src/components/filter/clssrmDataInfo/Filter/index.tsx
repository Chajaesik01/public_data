// Filter.tsx
import React from 'react';
import ActivityFilter from '../ActivityFilter';
import RegionFilter from '../RegionFilter';
import DisabilityTypeFilter from '../DisabilityTypeFilter';

interface FilterProps {
  selectedActivity: string;
  setSelectedActivity: React.Dispatch<React.SetStateAction<string>>;
  selectedRegion: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
  selectedDisabilityType: string;
  setSelectedDisabilityType: React.Dispatch<React.SetStateAction<string>>;
}

const Filter: React.FC<FilterProps> = ({
  selectedActivity,
  setSelectedActivity,
  selectedRegion,
  setSelectedRegion,
  selectedDisabilityType,
  setSelectedDisabilityType
}) => {
  return (
    <div>
      <ActivityFilter
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
      />
      <RegionFilter
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
      <DisabilityTypeFilter
        selectedDisabilityType={selectedDisabilityType}
        setSelectedDisabilityType={setSelectedDisabilityType}
      />
    </div>
  );
};

export default Filter;
