import React from 'react';
import styled from 'styled-components';
import ActivityFilter from '../ActivityFilter';
import RegionFilter from '../RegionFilter';

interface FilterProps {
  selectedActivity: string;
  setSelectedActivity: React.Dispatch<React.SetStateAction<string>>;
  selectedRegion: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
}

// Styled components
const Container = styled.div`
  padding: 20px; /* 여백 추가 */
  background-color: #f9f9f9; /* 배경색 */
  border-radius: 8px; /* 모서리 둥글게 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
`;

const Title = styled.h2`
  margin-bottom: 20px; /* 아래쪽 여백 */
  font-size: 24px; /* 제목 크기 */
  color: #333; /* 제목 색상 */
`;

const Filter: React.FC<FilterProps> = ({
  selectedActivity,
  setSelectedActivity,
  selectedRegion,
  setSelectedRegion,
}) => {
  return (
    <Container>
      <Title>필터 선택</Title>
      <ActivityFilter
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
      />
      <RegionFilter
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    </Container>
  );
};

export default Filter;
