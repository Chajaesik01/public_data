import React, { useState } from 'react';
import styled from 'styled-components';
import { LeftSide } from '../../components';
import FilteredActivityList from '../../components/filter/FilteredActivityList'; // FilteredActivityList 임포트
import Form from '../../components/Form'; // Form 컴포넌트 임포트
import { Activity } from '../../../data/excel/ClssrmDataInfo'; // Activity 인터페이스 임포트

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column; /* 방향을 열로 변경 */
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh; 
  margin: 10vh 10vw; 
  border: 0.5px solid #000; 
`;

const FilteredContainer = styled.div`
  margin-bottom: 20px; /* LeftSide와 Form 사이의 여백 */
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  min-height: 70%
`;

const Home = () => {
  const [selectedFacility, setSelectedFacility] = useState<string>(''); // 선택된 시설 이름 상태
  const [activityInfo, setActivityInfo] = useState<Activity | null>(null); // 선택된 활동 정보 상태

  return (
    <CenteredContainer>
      <FilteredContainer>
        <FilteredActivityList 
          setSelectedFacility={setSelectedFacility} 
          setActivityInfo={setActivityInfo} // 선택된 활동 정보를 업데이트하는 함수 전달
        />
      </FilteredContainer>
      <MainContent>
        <LeftSide />
        <Form selectedFacility={selectedFacility} activityInfo={activityInfo} /> {/* 선택된 시설과 활동 정보를 Form에 전달 */}
      </MainContent>
    </CenteredContainer>
  );
}

export default Home;
