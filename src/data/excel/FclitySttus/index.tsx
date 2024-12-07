import React, { useEffect } from 'react';
import Papa from 'papaparse';

export interface Facility {
    FCLTY_NM: string;                  // 시설명
    FCLTY_SDIV_CD: string;             // 시설 구분 코드
    FCLTY_FLAG_NM: string;             // 시설 플래그 명
    INDUTY_CD: string;                  // 산업 코드
    INDUTY_NM: string;                  // 산업 명
    FCLTY_TY_CD: string;                // 시설 타입 코드
    FCLTY_TY_NM: string;                // 시설 타입 명
    POSESN_MBY_CD: string;              // 소유자 코드
    POSESN_MBY_NM: string;              // 소유자 명
    POSESN_MBY_CTPRVN_CD: string;       // 소유자 광역시 코드
    POSESN_MBY_CTPRVN_NM: string;       // 소유자 광역시 명
    POSESN_MBY_SIGNGU_CD: string;       // 소유자 시군구 코드
    POSESN_MBY_SIGNGU_NM: string;       // 소유자 시군구 명
    RSPNSBLTY_DEPT_NM: string;          // 책임 부서 명
    RSPNSBLTY_TEL_NO: string;           // 책임 전화번호
    ROAD_NM_CTPRVN_CD: string;          // 도로명 광역시 코드
    ROAD_NM_CTPRVN_NM: string;          // 도로명 광역시 명
    ROAD_NM_SIGNGU_CD: string;          // 도로명 시군구 코드
    ROAD_NM_SIGNGU_NM: string;          // 도로명 시군구 명
    ROAD_NM_EMD_CD: string;             // 도로명 읍면동 코드
    ROAD_NM_EMD_NM: string;             // 도로명 읍면동 명
    ROAD_NM_LI_CD: string;              // 도로명 리 코드
    ROAD_NM_LI_NM: string;              // 도로명 리 명
    RDNMADR_NM: string;                 // 도로 주소
    FCLTY_LO: number;                   // 시설 경도
    FCLTY_LA: number;                   // 시설 위도
    FCLTY_AR_CO: number;                // 시설 면적
    ACMD_NMPR_CO: number;               // 수용 인원 수
    ADTM_CO: number;                    // 추가 인원 수
    FCLTY_HMPG_URL?: string;            // 시설 홈페이지 URL (선택적)
    NATION_ALSFC_AT: string;            // 국가 알림 여부
    FCLTY_STATE_CD: string;             // 시설 상태 코드
    DEL_AT: string;                     // 삭제 여부
  }

  
  const FclitySttus: React.FC<{ onDataLoaded: (data: Facility[]) => void }> = ({ onDataLoaded }) => {
    useEffect(() => {
      const loadData = async () => {
        try {
          const response = await fetch('./KS_WNTY_PUBLIC_PHSTRN_FCLTY_STTUS_202407.csv');
          const data = await response.text();
          Papa.parse(data, {
            header: true,
            complete: (results: any) => {
              const loadedActivities: Facility[] = results.data.map((row: any) => row as Facility);
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
  
  export default FclitySttus;
  