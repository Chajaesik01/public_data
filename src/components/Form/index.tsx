import React, { useEffect } from 'react';
import { Activity } from '../../data/excel/ClssrmDataInfo'; 
import { NFacilityService } from '../../data/csv/NearbyPbtrnspInfo'; 

interface FormProps {
    selectedFacility: string; 
    activityInfo: Activity | null; 
    nFacilityService: NFacilityService | null; 
    onClearActivityInfo: () => void; 
    onClearNFacilityService: () => void; 
}

const Form: React.FC<FormProps> = ({
    selectedFacility,
    activityInfo,
    nFacilityService,
    onClearActivityInfo,
    onClearNFacilityService
}) => {
    useEffect(() => {
        // nFacilityService가 존재할 때 activityInfo를 지움
        if (nFacilityService) {
            onClearActivityInfo();
        }
    }, [nFacilityService, onClearActivityInfo]);

    useEffect(() => {
        // activityInfo가 존재할 때 nFacilityService를 지움
        if (activityInfo) {
            onClearNFacilityService();
        }
    }, [activityInfo, onClearNFacilityService]);

    return (
        <div>
            <h2>선택된 시설 정보</h2>
            <p>시설 이름: {selectedFacility}</p>
            {activityInfo ? (
                <div>
                    <h3>활동 정보</h3>
                    <p>활동 이름: {activityInfo.ITEM_NM}</p>
                    <p>서브 항목: {activityInfo.SUBITEM_NM}</p>
                    <p>지역: {activityInfo.CTPRVN_NM}</p>
                    <p>시군구: {activityInfo.SIGNGU_NM}</p>
                    <p>시설명: {activityInfo.CLSSRM_NM}</p>
                    <p>장애인 유형: {activityInfo.TROBL_TY_NM}</p>
                    <p>운영 시간: {activityInfo.OPER_TIME_CN}</p>
                    <p>시설 소개: {activityInfo.CLSSRM_INTRCN_CN}</p>
                    <button onClick={onClearActivityInfo}>활동 정보 지우기</button>
                </div>
            ) : nFacilityService ? (
                <div>
                    <h3>시설 상세 정보</h3>
                    <p>시설 종류: {nFacilityService.SVCH_FCLTY_SDIV_NM}</p>
                    <p>시설 아이템: {nFacilityService.SVCH_FCLTY_ITEM_NM}</p>
                    <p>주소: {nFacilityService.SVCH_FCLTY_ADDR}</p>
                    <p>상세 주소: {nFacilityService.SVCH_FCLTY_DETAIL_ADDR}</p>
                    <p>위도: {nFacilityService.SVCH_FCLTY_LA}</p>
                    <p>경도: {nFacilityService.SVCH_FCLTY_LO}</p>
                    <p>교통수단 종류: {nFacilityService.PBTRNSP_FCLTY_SDIV_NM}</p>
                    <p>최단 거리: {nFacilityService.STRT_DSTNC_VALUE}m</p>
                    <p>도보 거리: {nFacilityService.WLKG_DSTNC_VALUE}m</p>
                    <p>도보 이동 시간: {nFacilityService.WLKG_MVMN_TIME}분</p>
                    <p>가까운 지하철역: {nFacilityService.BSTP_SUBWAYST_NM}</p>
                    <button onClick={onClearNFacilityService}>시설 서비스 정보 지우기</button>
                </div>
            ) : (
                <p>시설을 검색 또는 선택하세요.</p>
            )}
        </div>
    );
};

export default Form;
