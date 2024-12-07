import React, { useEffect } from 'react';
import Papa from 'papaparse';

export interface Activity {
  ITEM_NM: string;
  SUBITEM_NM?: string; // 선택적 속성
  CTPRVN_NM: string;
  SIGNGU_NM: string;
  CLSSRM_NM: string;
  TROBL_TY_NM: string;
  OPER_TIME_CN: string;
  CLSSRM_INTRCN_CN?: string; // 선택적 속성
}

const ClssrmDataInfo: React.FC<{ onDataLoaded: (data: Activity[]) => void }> = ({ onDataLoaded }) => {
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('./KS_DSPSN_LVLH_PHSTRN_CLSSRM_DATA_INFO_202407.csv');
        const data = await response.text();
        Papa.parse(data, {
          header: true,
          complete: (results: any) => {
            const loadedActivities: Activity[] = results.data.map((row: any) => row as Activity);
            onDataLoaded(loadedActivities); // 데이터를 한 번만 로드
          }
        });
      } catch (error) {
        console.error('Error fetching the CSV file:', error);
      }
    };

    loadData(); // 데이터 로드 실행
  }, [onDataLoaded]);

  return null; // UI를 렌더링하지 않음
}

export default ClssrmDataInfo;
