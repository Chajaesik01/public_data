import React from 'react';
import { Activity } from '../../../data/excel/ClssrmDataInfo'; // Activity 인터페이스 임포트

interface FormProps {
    selectedFacility: string; // 선택된 시설 이름
    activityInfo: Activity | null; // 선택된 활동 정보
}

const Form: React.FC<FormProps> = ({ selectedFacility, activityInfo }) => {
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
                </div>
            ) : (
                <p>시설을 선택하세요.</p>
            )}
        </div>
    );
};

export default Form;
