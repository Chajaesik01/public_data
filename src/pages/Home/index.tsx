import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LeftSide } from '../../components';
import FilteredActivityList from '../../components/filter/clssrmDataInfo/FilteredActivityList'; 
import NFilteredActivityList from '../../components/filter/nearybyPbtrnspInfo/FilteredActivityList'; 
import Form from '../../components/Form'; 
import TotalFilter from '../../components/filter/TotalFilter'; 
import { Activity } from '../../data/excel/ClssrmDataInfo'; 
import { NFacilityService  } from '../../data/csv/NearbyPbtrnspInfo'; 
import Header from '../../components/Header';
import main1 from '../../assets/main1.jpg';
import main2 from '../../assets/main2.jpg';
import main3 from '../../assets/main3.jpg';
import main4 from '../../assets/main4.png';

const StyledCenteredContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh; 
  margin: 0 10vw; 
  border: 0.5px solid #000; 
  position: relative;

  @media (max-width: 768px) {
    width: 95vw; /* 모바일에서 폭을 더 늘림 */
    height: auto; /* 높이를 자동으로 조정 */
    margin: 0 5vw; /* 모바일에서 여백 조정 */
  }
`;

const StyledFilteredContainer = styled.div`
  margin-bottom: 20px; 

  @media (max-width: 768px) {
    margin-bottom: 15px; /* 모바일에서 여백 조정 */
  }
`;

const StyledMainContent = styled.div`
  display: flex;
  width: 100%;
  min-height: 70%;
  flex-direction: column; /* 모바일에서 세로 정렬 */

  @media (min-width: 769px) {
    flex-direction: row; /* 데스크탑에서는 가로 정렬 */
  }
`;

const CurtainImage = styled.img`
  width: 100%;
  height: auto; 
  max-height: 80vh; 
  object-fit: cover; 
  filter: grayscale(100%); /* 흑백 필터 적용 */
`;

const OverlayContainer = styled.div`
  position: absolute; /* 절대 위치 설정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between; /* 양쪽 끝으로 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  color: white; /* 텍스트 색상 */
  z-index: 2; /* 이미지 위에 표시 */
  padding: 0 20px; /* 양쪽 여백 */
`;

const TextContainer = styled.div`
  text-align: left; 
  background-color: rgba(0, 0, 0, 0.5); 
  padding: 10px; 
  border-radius: 5px; 
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); 

  h1 {
    font-size: 64px;

    @media (max-width: 768px) {
      font-size: 20px; /* 모바일에서 폰트 크기 조정 */
    }
  }

  p { 
    font-size: 32px;

    @media (max-width: 768px) {
      font-size: 14px; /* 모바일에서 폰트 크기 조정 */
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; /* 버튼을 세로로 정렬 */
  align-items: flex-end; /* 오른쪽 정렬 */
`;

const Button = styled.button`
  margin-right: 100px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff; 
  color: white; 
  font-size: 32px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    margin-left: 10px;
    margin-right: 0; /* 모바일에서 여백 조정 */
    font-size: 20px; /* 폰트 크기 조정 */
    padding: 8px; /* 패딩 조정 */
  }
`;

const images = [main1, main2, main3, main4]; // 이미지 배열

const Home = () => {
  const [selectedFacility, setSelectedFacility] = useState<string>(''); 
  const [activityInfo, setActivityInfo] = useState<Activity | null>(null); 
  const [nFacilityService, setNFacilityService] = useState<NFacilityService | null>(null); 
  const [selectedProgram, setSelectedProgram] = useState<string>(''); 
  const [showContent, setShowContent] = useState<boolean>(false); // 컨텐츠 표시 상태
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // 현재 이미지 인덱스

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => 
        (prevIndex + 1) % images.length // 이미지 인덱스를 순환
      );
    }, 2000); // 2초 간격

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  const handleClearActivityInfo = () => {
    setActivityInfo(null);
  };

  const handleClearNFacilityService = () => {
    setNFacilityService(null);
  };

  const handleSelectActivityInfo = (info: Activity | null) => {
    setActivityInfo(info);
    setNFacilityService(null); // nFacilityService를 지웁니다.
  };

  const handleSelectNFacilityService = (service: NFacilityService | null) => {
    setNFacilityService(service);
    setActivityInfo(null); // activityInfo를 지웁니다.
  };

  const handleToggleContent = () => {
    setShowContent(prev => !prev); // 버튼 클릭 시 컨텐츠 토글
  };

    // 맵 초기화 함수 추가
    const handleClearMap = () => {
      setSelectedFacility(''); // 선택된 시설 초기화
      setActivityInfo(null); // 활동 정보 초기화
      setNFacilityService(null); // 시설 서비스 초기화
    };



  return (
    <>
      <Header />
      <StyledCenteredContainer>
        {!showContent && <CurtainImage src={images[currentImageIndex]} alt="Curtain" />}
        {!showContent && (
          <OverlayContainer>
            <TextContainer>
              <h1>장애인 체육 시설을 찾아보세요!</h1>
              <p>장애인 생활 체육 교실과 장애인스포츠강좌이용권시설을 안내합니다.</p>
            </TextContainer>
            <ButtonContainer>
              <Button onClick={handleToggleContent}>
                {showContent ? '숨기기' : '찾아보기'}
              </Button>
            </ButtonContainer>
          </OverlayContainer>
        )}

        {showContent && (
          <>
            <TotalFilter 
              selectedProgram={selectedProgram}
              setSelectedProgram={setSelectedProgram}
              onClearMap={handleClearMap} // 맵 초기화 함수 전달
            />
            <StyledFilteredContainer>
              {selectedProgram === "장애인 생활체육 교실" && (
                <FilteredActivityList 
                  setSelectedFacility={setSelectedFacility} 
                  setActivityInfo={handleSelectActivityInfo} // 선택된 활동 정보를 설정합니다.
                />
              )}
              {selectedProgram === "장애인스포츠강좌이용권시설" && (
                <NFilteredActivityList
                  setSelectedFacility={setSelectedFacility}
                  setNFacilityService={handleSelectNFacilityService} // 선택된 시설 서비스를 설정합니다.
                />
              )}
            </StyledFilteredContainer>
            <StyledMainContent>
              <LeftSide selectedFacility={nFacilityService?.SVCH_FCLTY_ADDR} /> {/* 선택된 시설 주소 전달 */}
              
              <Form 
                selectedFacility={selectedFacility} 
                activityInfo={activityInfo} 
                nFacilityService={nFacilityService} 
                onClearActivityInfo={handleClearActivityInfo} 
                onClearNFacilityService={handleClearNFacilityService} 
              /> 
              
            </StyledMainContent>
          </>
        )}
      </StyledCenteredContainer>
    </>
  );
}

export default Home;
