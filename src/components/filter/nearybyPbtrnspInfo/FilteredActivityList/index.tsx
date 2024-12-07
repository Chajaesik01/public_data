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

interface FilterProps {
    setSelectedFacility: (facility: string) => void;
    setNFacilityService: (service: NFacilityService | null) => void;
}

const SuggestionsList = styled.ul`
  position: absolute; // 리스트를 절대 위치로 설정
  top: 100%; // 인풋창 바로 아래에 위치
  left: 0; // 인풋창의 왼쪽에 맞추기
  right: 0; // 인풋창의 오른쪽에 맞추기
  background-color: white; // 배경색 설정
  border: 1px solid #ccc; // 테두리 설정
  z-index: 10; // 다른 요소 위에 표시되도록 설정
  margin: 0; // 기본 margin 제거
  padding: 0; // 기본 padding 제거
  list-style-type: none; // 리스트 스타일 제거
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
    align-items: flex-end; /* 오른쪽 정렬 */

    select {
                min-width: 200px; /* 최소 너비 설정 */
        max-width: 1000px;
        max-height: 40px; /* 고정 높이 설정 */
        padding: 0 10px; /* 수평 패딩만 추가 */
        border: 1px solid #ccc; /* 테두리 색상 */
        border-radius: 4px; /* 모서리 둥글게 */
        font-size: 32px; /* 글자 크기 */
        color: #333; /* 글자 색상 */
        background-color: white; /* 배경색 */
        margin-left: 100px;

        &:focus {
            border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
            outline: none; /* 포커스 시 기본 테두리 제거 */
        }
    }
`;
const StyledSearch = styled.div`
    font-size: 30px;
    display: flex; /* flexbox를 사용하여 수평 정렬 */
    align-items: center; /* 수직 중앙 정렬 */

    input {
        min-width: 200px; /* 최소 너비 설정 */
        max-height: 40px; /* 고정 높이 설정 */
        padding: 0 10px; /* 수평 패딩만 추가 */
        border: 1px solid #ccc; /* 테두리 색상 */
        border-radius: 4px; /* 모서리 둥글게 */
        font-size: 32px; /* 글자 크기 */
        color: #333; /* 글자 색상 */
        background-color: white; /* 배경색 */
        margin-left: 20px;

        &:focus {
            border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
            outline: none; /* 포커스 시 기본 테두리 제거 */
        }
    }

    button {
        width: 100px;
        height: 40px;
        padding: 0 10px; /* 수평 패딩만 추가 */
        margin-left: 10px; /* input과의 간격 추가 */
        background-color: #007bff; /* 버튼 배경색 */
        color: white; /* 버튼 글자 색상 */
        border: none; /* 테두리 제거 */
        border-radius: 4px; /* 모서리 둥글게 */
        cursor: pointer; /* 마우스 커서 변경 */

        &:hover {
            background-color: #0056b3; /* 호버 시 색상 변경 */
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
                    const response = await fetch('./KS_SVCH_FCLTY_NEARBY_PBTRNSP_INFO_202407.csv');
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
        const selectedActivityInfo = activitiesRef.current.find(activity => activity.SVCH_FCLTY_NM === facilityName);
        setNFacilityService(selectedActivityInfo || null);
        setSuggestions([]);
    };

    const handleFacilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedFacilityName(selected); // 상태 업데이트
        if (selected) {
            setSelectedFacility(selected);
            const selectedActivityInfo = activitiesRef.current.find(activity => activity.SVCH_FCLTY_NM === selected);
            setNFacilityService(selectedActivityInfo || null);
        }
    };

    const handleReset = () => {
        // 부모 컴포넌트의 상태 초기화
        setSelectedFacility(''); // 선택된 시설 초기화
        setNFacilityService(null); // 시설 서비스 초기화
    
        // 내부 상태 초기화
        setSelectedActivity('');
        setSelectedRegion('');
        setName('');
        setSuggestions([]);
        setFilteredActivities(activitiesRef.current); // 원래 데이터로 초기화
        setSelectedFacilityName(''); // 시설 선택 항목 초기화
    };
    
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleReset();
    };

    return (
        <div style={{ position: 'relative' }}>
            {isLoading ? (
                <div>데이터 로딩중입니다...</div>
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
                    <form onSubmit={handleSubmit}>
                        <label>
                            시설 이름 검색 :
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </label>
                        <button type="button" onClick={handleReset}>
                            초기화
                        </button>
                    </form>
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
function setActivityInfo(arg0: null) {
    throw new Error('Function not implemented.');
}

