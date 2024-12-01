import React, { useEffect, useState } from 'react';
import { Activity } from '../../data/excel/ClssrmDataInfo'; 
import { NFacilityService } from '../../data/csv/NearbyPbtrnspInfo'; 
import Map from '../Map'; // Map 컴포넌트 임포트

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
    const [address, setAddress] = useState<string | undefined>(undefined);

    // nFacilityService가 변경될 때마다 호출
    useEffect(() => {
        if (nFacilityService) {
            onClearActivityInfo();
            // nFacilityService가 있을 때, 상세 주소를 상태에 설정
            setAddress(nFacilityService.SVCH_FCLTY_ADDR); // nFacilityService의 주소 추가
        }
    }, [nFacilityService, onClearActivityInfo]);

    // activityInfo가 변경될 때마다 호출
    useEffect(() => {
        if (activityInfo) {
            onClearNFacilityService();
            // activityInfo가 있을 때, 시군구를 상태에 설정
            setAddress(activityInfo.SIGNGU_NM); // activityInfo의 시군구 추가
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
                    <p>주소: {nFacilityService.SVCH_FCLTY_ADDR}</p> {/* nFacilityService의 주소 추가 */}
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
            {/* Map 컴포넌트 추가, nFacilityService의 주소 사용 */}
            <Map address={address} />
        </div>
    );
};

export default Form;
