import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';
import ActivityFilter from '../ActivityFilter';
import RegionFilter from '../RegionFilter';
import styled from 'styled-components';

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

export interface FilterProps {
    setSelectedFacility: (facility: string) => void;
    setNFacilityService: (service: NFacilityService | null) => void; // null을 허용
}

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 10;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const SuggestionItem = styled.div`
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const FacilitySelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* 중앙 정렬 */

    label {
        margin-bottom: 10px; /* 레이블과 select 사이 간격 추가 */
    }

    select {
        min-width: 200px;
        max-width: 100%;
        max-height: 40px;
        padding: 0 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 32px;
        color: #333;
        background-color: white;

        &:focus {
            border-color: #007bff;
            outline: none;
        }

        @media (max-width: 768px) {
            font-size: 20px; /* 모바일에서 select 글자 크기 조정 */
            width: 100%; /* 부모의 너비를 채우도록 설정 */
            max-width: 300px; /* 최대 너비 설정 (필요에 따라 조정) */
        }
    }
`;

const StyledSearch = styled.div`
    font-size: 30px;
    display: flex;
    flex-direction: column; /* 세로 방향으로 배치 */
    margin-bottom: 20px; /* 아래 여백 추가 */

    label {
        font-size: 20px; /* 레이블 글자 크기 */
        margin-bottom: 10px; /* 레이블과 인풋 사이 간격 추가 */
    }

    .input-button-container {
        display: flex; /* 인풋과 버튼을 가로로 배치 */
        align-items: center; /* 수직 중앙 정렬 */
    }

    input {
        min-width: 200px;
        max-height: 40px;
        padding: 0 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 32px;
        color: #333;
        background-color: white;
        margin-right: 10px; /* 버튼과의 간격 추가 */

        &:focus {
            border-color: #007bff;
            outline: none;
        }

        @media (max-width: 768px) {
            font-size: 20px; /* 모바일에서 글자 크기 조정 */
            width: 100%; /* 부모의 너비를 채우도록 설정 */
        }
    }

    button {
        width: 100px;
        height: 40px;
        padding: 0 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: #0056b3;
        }

        @media (max-width: 768px) {
            font-size: 18px; /* 모바일에서 버튼 글자 크기 조정 */
        }
    }
`;

const NFilteredActivityList: React.FC<FilterProps> = ({
    setSelectedFacility,
    setNFacilityService,
}) => {
    const activitiesRef = useRef<NFacilityService[]>([]);
    const dataLoadedRef = useRef(false);
    const [filteredActivities, setFilteredActivities] = useState<NFacilityService[]>([]);
    const [selectedActivity, setSelectedActivity] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [name, setName] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedFacilityName, setSelectedFacilityName] = useState<string>('');

    const handleDataLoaded = (data: NFacilityService[]) => {
        if (!dataLoadedRef.current) {
            activitiesRef.current = data;
            dataLoadedRef.current = true;
            setFilteredActivities(data);
            setIsLoading(false);
            localStorage.setItem('activities', JSON.stringify(data));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const cachedData = localStorage.getItem('activities');
            if (cachedData) {
                const data = JSON.parse(cachedData) as NFacilityService[];
                handleDataLoaded(data);
            } else {
                try {
                    const response = await fetch('https://media.githubusercontent.com/media/Chajaesik01/public_data/refs/heads/main/public/KS_SVCH_FCLTY_NEARBY_PBTRNSP_INFO_202407.csv');
                    if (!response.ok) {
                        throw new Error('네트워크 응답에 문제가 있습니다.');
                    }
                    const data = await response.text();
                    Papa.parse(data, {
                        header: true,
                        complete: (results: any) => {
                            const uniqueFacilities = new Set();
                            const filteredData = results.data.filter((row: any) => {
                                if (row.SVCH_FCLTY_SDIV_NM === "장애인스포츠강좌이용권시설") {
                                    if (!uniqueFacilities.has(row.SVCH_FCLTY_NM)) {
                                        uniqueFacilities.add(row.SVCH_FCLTY_NM);
                                        return true;
                                    }
                                }
                                return false;
                            });
                            handleDataLoaded(filteredData);
                        }
                    });
                } catch (error) {
                    console.error('데이터를 불러오는 중 오류 발생:', error);
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (dataLoadedRef.current) {
            const updatedFilteredActivities = activitiesRef.current.filter(activity =>
                (selectedActivity === '' || activity.SVCH_FCLTY_ITEM_NM === selectedActivity) &&
                (selectedRegion === '' || activity.SVCH_FCLTY_CTPRVN_NM === selectedRegion)
            );
            setFilteredActivities(updatedFilteredActivities);
        }
    }, [selectedActivity, selectedRegion]);

    const filterSuggestions = (value: string) => {
        if (value) {
            return filteredActivities
                .filter(activity => activity.SVCH_FCLTY_NM && activity.SVCH_FCLTY_NM.toLowerCase().includes(value.toLowerCase()))
                .map(activity => activity.SVCH_FCLTY_NM);
        } else {
            return [];
        }
    };

    useEffect(() => {
        const newSuggestions = filterSuggestions(name);
        setSuggestions(newSuggestions);
    }, [filteredActivities, name]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSuggestionClick = (facilityName: string) => {
        setName(facilityName);
        setSelectedFacility(facilityName);
        setSelectedFacilityName(facilityName); // 선택한 시설 이름을 select에 반영
        const selectedActivityInfo = activitiesRef.current.find(activity => activity.SVCH_FCLTY_NM === facilityName);
        setNFacilityService(selectedActivityInfo || null);
        setSuggestions([]);
    };

    const handleFacilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedFacilityName(selected);
        if (selected) {
            setSelectedFacility(selected);
            const selectedActivityInfo = activitiesRef.current.find(activity => activity.SVCH_FCLTY_NM === selected);
            setNFacilityService(selectedActivityInfo || null);
        }
    };
    const handleReset = () => {
        setSelectedFacility('');
        setNFacilityService(null);
        setSelectedActivity('');
        setSelectedRegion('');
        setName('');
        setSuggestions([]);
        setFilteredActivities(activitiesRef.current);
        setSelectedFacilityName(''); // 시설 선택 항목 초기화
    };
    
    
    return (
        <div style={{ position: 'relative' }}>
            {isLoading ? (
                <div>초기 데이터 로딩중입니다 이 작업은 최대 1분 정도 걸릴 수 있으며 처음에만 실행됩니다...</div>
            ) : (
                <>
                    <ActivityFilter
                        selectedActivity={selectedActivity}
                        setSelectedActivity={setSelectedActivity}
                    />
                    <RegionFilter
                        selectedRegion={selectedRegion}
                        setSelectedRegion={setSelectedRegion}
                    />
                    <StyledSearch>
                        <label>시설 이름 검색 :</label>
                        <div className="input-button-container">
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <button type="button" onClick={handleReset}>
                                초기화
                            </button>
                        </div>
                        {suggestions.length === 0 && name && (
                            <div>검색된 시설이 없습니다.</div>
                        )}
                    </StyledSearch>

                    <StyledSearch>
                        <FacilitySelectContainer>
                            <label>
                                시설 선택:
                                <select onChange={handleFacilityChange} value={selectedFacilityName}>
                                    <option value="">선택하세요</option>
                                    {filteredActivities.map((activity, index) => (
                                        <option key={`${activity.SVCH_FCLTY_NM}-${index}`} value={activity.SVCH_FCLTY_NM}>
                                            {activity.SVCH_FCLTY_NM}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </FacilitySelectContainer>
                        {suggestions.length > 0 && (
                            <SuggestionsList>
                                {suggestions
                                    .filter(facilityName => facilityName !== name)
                                    .map((facilityName, index) => (
                                        <SuggestionItem key={index} onClick={() => handleSuggestionClick(facilityName)}>
                                            {facilityName}
                                        </SuggestionItem>
                                    ))}
                            </SuggestionsList>
                        )}
                    </StyledSearch>
                </>
            )}
        </div>
    );
};

export default NFilteredActivityList;