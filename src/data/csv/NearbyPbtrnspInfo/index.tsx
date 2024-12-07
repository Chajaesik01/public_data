import React, { useEffect, useState, useMemo } from 'react';
import Papa from 'papaparse';
import { FixedSizeList as List } from 'react-window';
import RegionFilter from '../../../components/filter/nearybyPbtrnspInfo/RegionFilter'; // RegionFilter 컴포넌트 임포트

export interface NFacilityService {
    SVCH_FCLTY_NM: string;                  
    SVCH_FCLTY_SDIV_NM: string;              
    SVCH_FCLTY_ITEM_NM: string;              
    SVCH_FCLTY_CTPRVN_CD: string;            
    SVCH_FCLTY_CTPRVN_NM: string;            
    SVCH_FCLTY_SIGNGU_CD: string;            
    SVCH_FCLTY_SIGNGU_NM: string;            
    SVCH_FCLTY_ADDR: string;                 
    SVCH_FCLTY_DETAIL_ADDR: string;          
    SVCH_FCLTY_LA: number;                   
    SVCH_FCLTY_LO: number;                   
    PBTRNSP_FCLTY_SDIV_NM: string;           
    STRT_DSTNC_VALUE: number;                
    WLKG_DSTNC_VALUE: number;                
    WLKG_MVMN_TIME: number;                  
    BSTP_SUBWAYST_NM: string;                
    PBTRNSP_FCLTY_LA: number;                
    PBTRNSP_FCLTY_LO: number;                
}

// ListItem의 props 정의
interface ListItemProps {
    style: React.CSSProperties; // 스타일 속성의 타입 정의
    name: string;
}

// 메모이제이션된 리스트 항목
const ListItem: React.FC<ListItemProps> = React.memo(({ style, name }) => (
    <div style={style}>
        {name}
    </div>
));

const NearbyPbtrnspInfo: React.FC = () => {
    const [allData, setAllData] = useState<NFacilityService[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<string>(''); // 선택된 지역 상태 추가

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('./KS_SVCH_FCLTY_NEARBY_PBTRNSP_INFO_202407.csv');
                console.log('응답 상태:', response.status);
                const data = await response.text();
                Papa.parse(data, {
                    header: true,
                    complete: (results: any) => {
                        // 중복 제거를 위한 Set 사용
                        const uniqueDataMap = new Map<string, NFacilityService>();
        
                        results.data.forEach((row: any) => {
                            // SVCH_FCLTY_SDIV_NM이 "장애인스포츠강좌이용권시설"인 경우만 필터링
                            if (row.SVCH_FCLTY_NM && row.SVCH_FCLTY_SDIV_NM === "장애인스포츠강좌이용권시설") {
                                uniqueDataMap.set(row.SVCH_FCLTY_NM, row as NFacilityService);
                            }
                        });
        
                        const uniqueData = Array.from(uniqueDataMap.values());
                        setAllData(uniqueData);
                    }
                });
            } catch (error) {
                console.error('Error fetching the CSV file:', error);
            }
        };

        loadData();
    }, []); 

    const filteredData = useMemo(() => {
        return selectedRegion 
            ? allData.filter(activity => activity.SVCH_FCLTY_CTPRVN_NM === selectedRegion) 
            : allData;
    }, [selectedRegion, allData]);

    return (
        <div>
            <RegionFilter selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} /> {/* RegionFilter 추가 */}
            <List
                height={500}
                itemCount={filteredData.length}
                itemSize={35}
                width={300}
                overscanCount={5}
            >
                {({ index, style }) => (
                    <ListItem style={style} name={filteredData[index].SVCH_FCLTY_NM} />
                )}
            </List>
        </div>
    );
}

export default NearbyPbtrnspInfo;
