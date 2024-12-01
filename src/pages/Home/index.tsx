import React, { useState } from 'react';
import styled from 'styled-components';
import { LeftSide } from '../../components';
import FilteredActivityList from '../../components/filter/clssrmDataInfo/FilteredActivityList'; 
import NFilteredActivityList from '../../components/filter/nearybyPbtrnspInfo/FilteredActivityList'; 
import Form from '../../components/Form'; 
import TotalFilter from '../../components/filter/TotalFilter'; 
import { Activity } from '../../data/excel/ClssrmDataInfo'; 
import { NFacilityService } from '../../data/csv/NearbyPbtrnspInfo'; 

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh; 
  margin: 10vh 10vw; 
  border: 0.5px solid #000; 
`;

const FilteredContainer = styled.div`
  margin-bottom: 20px; 
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  min-height: 70%;
`;

const Home = () => {
  const [selectedFacility, setSelectedFacility] = useState<string>(''); 
  const [activityInfo, setActivityInfo] = useState<Activity | null>(null); 
  const [nFacilityService, setNFacilityService] = useState<NFacilityService | null>(null); 
  const [selectedProgram, setSelectedProgram] = useState<string>(''); 

  const handleClearActivityInfo = () => {
    setActivityInfo(null);
  };

  const handleClearNFacilityService = () => {
    setNFacilityService(null);
  };

  const handleSelectActivityInfo = (info: Activity) => {
    setActivityInfo(info);
    setNFacilityService(null); // nFacilityService를 지웁니다.
  };

  const handleSelectNFacilityService = (service: NFacilityService) => {
    setNFacilityService(service);
    setActivityInfo(null); // activityInfo를 지웁니다.
  };

  return (
    <CenteredContainer>
      <TotalFilter 
        selectedProgram={selectedProgram}
        setSelectedProgram={setSelectedProgram}
      />
      <FilteredContainer>
        {selectedProgram === "장애인 생활체육교실" && (
          <FilteredActivityList 
            setSelectedFacility={setSelectedFacility} 
            setActivityInfo={handleSelectActivityInfo} // 선택된 활동 정보를 설정합니다.
          />
        )}
        {selectedProgram === "전국 공공 체육시설 데이터" && (
          <NFilteredActivityList
            setSelectedFacility={setSelectedFacility}
            setNFacilityService={handleSelectNFacilityService} // 선택된 시설 서비스를 설정합니다.
          />
        )}
      </FilteredContainer>
      <MainContent>
        <LeftSide />
        <Form 
          selectedFacility={selectedFacility} 
          activityInfo={activityInfo} 
          nFacilityService={nFacilityService} 
          onClearActivityInfo={handleClearActivityInfo} 
          onClearNFacilityService={handleClearNFacilityService} 
        /> 
      </MainContent>
    </CenteredContainer>
  );
}

export default Home;
