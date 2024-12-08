import React, { useEffect } from 'react';
import { Activity } from '../../data/excel/ClssrmDataInfo'; 
import { NFacilityService } from '../../data/csv/NearbyPbtrnspInfo'; 
import styled from 'styled-components';

interface FormProps {
    selectedFacility: string; 
    activityInfo: Activity | null; 
    nFacilityService: NFacilityService | null; 
    onClearActivityInfo: () => void; 
    onClearNFacilityService: () => void; 
}

const RightSideContainer = styled.div`
  width: 50%;
  max-height: 73%;
  margin-top: 2vh;
  margin-right: 10vw;
  background-color: rgba(240, 240, 240, 0.4);
  padding: 20px;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const InfoSection = styled.div`
  margin-bottom: 12px;
`;

const Form: React.FC<FormProps> = ({
    selectedFacility,
    activityInfo,
    nFacilityService,
    onClearActivityInfo,
    onClearNFacilityService
}) => {
    //const [address, setAddress] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (nFacilityService) {
            onClearActivityInfo();
            // setAddress(nFacilityService.SVCH_FCLTY_ADDR);
        }
    }, [nFacilityService]);

    useEffect(() => {
        if (activityInfo) {
            onClearNFacilityService();
            // setAddress(activityInfo.SIGNGU_NM);
        }
    }, [activityInfo]);

    return (
        <RightSideContainer>
            <Title>선택된 시설 정보</Title>
            <p>시설 이름: {selectedFacility}</p>
            {activityInfo ? (
                <InfoSection>
                    <h3>종목 정보</h3>
                    <p>종목 이름: {activityInfo.ITEM_NM}</p>
                    <p>지역: {activityInfo.CTPRVN_NM} {activityInfo.SIGNGU_NM}</p>
                    <p>장애인 유형: {activityInfo.TROBL_TY_NM}</p>
                    <p>운영 시간: {activityInfo.OPER_TIME_CN}</p>
                    <p>시설 소개: {activityInfo.CLSSRM_INTRCN_CN}</p>
                </InfoSection>
            ) : nFacilityService ? (
                <InfoSection>
                    <h3>시설 상세 정보</h3>
                    <p>종목: {nFacilityService.SVCH_FCLTY_ITEM_NM}</p>
                    <p>주소: {nFacilityService.SVCH_FCLTY_ADDR}</p>
                    <p>상세 주소: {nFacilityService.SVCH_FCLTY_DETAIL_ADDR}</p>
                    <p>가까운 버스정류장: {nFacilityService.BSTP_SUBWAYST_NM}</p>
                </InfoSection>
            ) : (
                <p>시설을 검색 또는 선택하세요.</p>
            )}
        </RightSideContainer>
    );
};

export default Form;
