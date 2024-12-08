import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';
import ActivityFilter from '../ActivityFilter';
import RegionFilter from '../RegionFilter';
import DisabilityTypeFilter from '../DisabilityTypeFilter';
import styled from 'styled-components';

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

export interface FilteredActivityListProps {
    setSelectedFacility: (facility: string) => void;
    setActivityInfo: (activityInfo: Activity | null) => void; // null을 허용
}

const SuggestionsList = styled.ul`
    position: absolute; /* 리스트를 절대 위치로 설정 */
    top: 100%; /* 인풋창 바로 아래에 위치 */
    left: 0; /* 인풋창의 왼쪽에 맞추기 */
    right: 0; /* 인풋창의 오른쪽에 맞추기 */
    background-color: white; /* 배경색 설정 */
    border: 1px solid #ccc; /* 테두리 설정 */
    z-index: 10; /* 다른 요소 위에 표시되도록 설정 */
    margin: 0; /* 기본 margin 제거 */
    padding: 0; /* 기본 padding 제거 */
    list-style-type: none; /* 리스트 스타일 제거 */
`;

const SuggestionItem = styled.li`
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const FiltersContainer = styled.div`
    display: flex;
    justify-content: space-between; /* 왼쪽과 오른쪽의 공간을 균등하게 배치 */
    margin-bottom: 20px;

    @media (max-width: 768px) {
        flex-direction: column; /* 모바일에서 세로 방향으로 변경 */
        align-items: center; /* 왼쪽 정렬 */
    }
`;

const FacilitySelectContainer = styled.div`
    display: flex;
    flex-direction: column; /* 세로 방향으로 배치 */
    align-items: center; /* 중앙 정렬 */

    select {
        max-width: 100%;
        margin-top: 10px; /* select와 레이블 사이 간격 추가 */
    }

    @media (max-width: 768px) {
        max-width: 70vw; /* 모바일에서 최대 너비 조정 */
        min-width: 150px; /* 모바일에서 최소 너비 조정 */
        font-size: 24px; /* 모바일에서 글자 크기 조정 */
        padding: 0 8px; /* 모바일에서 패딩 조정 */
        margin: 0 auto; /* 중앙 정렬을 위한 자동 여백 설정 */
    }
`;

const HorizontalContainer = styled.div`
    display: flex;
    gap: 10px; /* 필터 간의 간격 */

    @media (max-width: 768px) {
        flex-direction: column; /* 모바일에서 세로 방향으로 변경 */
    }
`;

const StyledSearch = styled.div`
    font-size: 30px;
    display: flex; /* flexbox 사용 */
    flex-direction: column; /* 세로 방향으로 배치 */
    align-items: center; /* 가로 중앙 정렬 */
    margin-bottom: 20px; /* 아래 여백 추가 */

    @media (max-width: 768px) {
        font-size: 24px; /* 모바일에서 전체 글자 크기 조정 */
    }

    label {
        font-size: 20px; /* 레이블 글자 크기 */
        margin-bottom: 10px; /* 레이블과 인풋 사이 간격 추가 */
    }

    input {
        min-width: 200px; /* 최소 너비 설정 */
        max-width: 100%; /* 최대 너비를 부모에 맞추기 */
        max-height: 40px; /* 고정 높이 설정 */
        padding: 0 10px; /* 수평 패딩만 추가 */
        border: 1px solid #ccc; /* 테두리 색상 */
        border-radius: 4px; /* 모서리 둥글게 */
        font-size: 32px; /* 기본 글자 크기 */
        color: #333; /* 글자 색상 */
        background-color: white; /* 배경색 */
        margin-bottom: 10px; /* 인풋과 버튼 사이 간격 추가 */

        @media (max-width: 768px) {
            font-size: 20px; /* 모바일에서 글자 크기 조정 */
        }
    }

    button {
        width: 100px;
        height: 40px;
        padding: 0 10px; /* 수평 패딩만 추가 */
        background-color: #007bff; /* 버튼 배경색 */
        color: white; /* 버튼 글자 색상 */
        border: none; /* 테두리 제거 */
        border-radius: 4px; /* 모서리 둥글게 */
        cursor: pointer; /* 마우스 커서 변경 */

        &:hover {
            background-color: #0056b3; /* 호버 시 색상 변경 */
        }

        @media (max-width: 768px) {
            font-size: 18px; /* 모바일에서 버튼 글자 크기 조정 */
        }
    }

    p {
        margin-left: 30px;
    }
`;

const StyledSelect = styled.div`
    font-size: 30px;
    display: flex; /* flexbox를 사용하여 수평 정렬 */
    flex-direction: column; /* 세로 방향으로 변경 */
    align-items: center; /* 수직 중앙 정렬 */
    position: relative; /* 부모 요소에 상대 위치 설정 */
    margin-bottom: 20px; /* 아래 여백 추가 */

    select {
        min-width: 200px; /* 최소 너비 설정 */
        max-width: 100%; /* 최대 너비를 부모에 맞추기 */
        max-height: 40px; /* 고정 높이 설정 */
        padding: 0 10px; /* 수평 패딩만 추가 */
        border: 1px solid #ccc; /* 테두리 색상 */
        border-radius: 4px; /* 모서리 둥글게 */
        font-size: 32px; /* 글자 크기 */
        color: #333; /* 글자 색상 */
        background-color: white; /* 배경색 */
        margin-top: 10px; /* select와 레이블 사이 간격 추가 */

        &:focus {
            border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
            outline: none; /* 포커스 시 기본 테두리 제거 */
        }
    }

    @media (max-width: 768px) {
        font-size: 24px; /* 모바일에서 전체 글자 크기 조정 */
    select {
        font-size: 20px; /* 모바일에서 select 글자 크기 조정 */
        margin-top: 10px; /* select와 레이블 사이 간격 추가 */
        width: 100%; /* 선택 요소가 부모의 너비를 채우도록 설정 */
        max-width: 300px; /* 최대 너비 설정 (필요에 따라 조정) */
    }
    }
`;

const FilteredActivityList: React.FC<FilteredActivityListProps> = ({
    setSelectedFacility,
    setActivityInfo,
}) => {
    const activitiesRef = useRef<Activity[]>([]);
    const dataLoadedRef = useRef(false);
    const [selectedActivity, setSelectedActivity] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedDisabilityType, setSelectedDisabilityType] = useState<string>('');
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
    const [name, setName] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedFacilityState, setSelectedFacilityState] = useState<string>(''); // 시설 선택 상태

    const handleDataLoaded = (data: Activity[]) => {
        if (!dataLoadedRef.current) {
            activitiesRef.current = data;
            dataLoadedRef.current = true;
            console.log('로드된 데이터:', activitiesRef.current);
            setFilteredActivities(data);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('https://media.githubusercontent.com/media/Chajaesik01/public_data/refs/heads/main/public/KS_DSPSN_LVLH_PHSTRN_CLSSRM_DATA_INFO_202407.csv');
                const data = await response.text();
                Papa.parse(data, {
                    header: true,
                    complete: (results: any) => {
                        const loadedActivities: Activity[] = results.data.map((row: any) => row as Activity);
                        handleDataLoaded(loadedActivities);
                    }
                });
            } catch (error) {
                console.error('Error fetching the CSV file:', error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const updatedFilteredActivities = activitiesRef.current.filter(activity =>
            (selectedActivity === '' || activity.ITEM_NM === selectedActivity) &&
            (selectedRegion === '' || activity.CTPRVN_NM === selectedRegion) &&
            (selectedDisabilityType === '' || activity.TROBL_TY_NM === selectedDisabilityType)
        );

        console.log('필터링된 활동:', updatedFilteredActivities);
        setFilteredActivities(updatedFilteredActivities);
    }, [selectedActivity, selectedRegion, selectedDisabilityType]);

    const filterSuggestions = (value: string) => {
        if (value) {
            return filteredActivities
                .filter(activity => activity.CLSSRM_NM && activity.CLSSRM_NM.toLowerCase().includes(value.toLowerCase()))
                .map(activity => activity.CLSSRM_NM);
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

    const handleFacilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value; // 선택된 시설 이름을 가져옵니다.
        setSelectedFacility(selected); // 상위 컴포넌트에 선택된 시설을 설정합니다.
        setSelectedFacilityState(selected); // 로컬 상태에 선택된 시설을 설정합니다.
    
        // 선택된 시설 이름과 일치하는 활동 정보를 찾습니다.
        const selectedActivityInfo = activitiesRef.current.find(activity => activity.CLSSRM_NM === selected);
        
        // 찾은 활동 정보가 있으면 업데이트하고, 없으면 null로 설정합니다.
        setActivityInfo(selectedActivityInfo || null);
    };
    
    const handleSuggestionClick = (facilityName: string) => {
        setName(facilityName); // 클릭한 시설 이름으로 입력값 설정
        setSelectedFacility(facilityName); // 상위 컴포넌트에 선택된 시설을 설정
        setSelectedFacilityState(facilityName); // 로컬 상태에 선택된 시설을 설정
    
        // 선택한 시설 이름에 해당하는 활동 정보를 찾습니다.
        const selectedActivityInfo = activitiesRef.current.find(activity => activity.CLSSRM_NM === facilityName);
        setActivityInfo(selectedActivityInfo || null); // 찾은 활동 정보를 설정하거나 null로 설정
        setSuggestions([]); // 제안 목록 초기화
    };
    
    const handleReset = () => {
        setSelectedActivity('');
        setSelectedRegion('');
        setSelectedDisabilityType('');
        setName('');
        setSuggestions([]);
        setFilteredActivities(activitiesRef.current);
        setSelectedFacilityState(''); // 시설 선택 상태 초기화
        setSelectedFacility(''); // 상위 컴포넌트의 선택된 시설 초기화
        setActivityInfo(null); // 활동 정보 초기화
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지
        handleReset(); // 리셋 함수 호출
    };
    
    return (
        <div style={{ position: 'relative' }}>
            <FiltersContainer>
                <HorizontalContainer>
                    <ActivityFilter
                        selectedActivity={selectedActivity}
                        setSelectedActivity={setSelectedActivity}
                    />
                    <RegionFilter
                        selectedRegion={selectedRegion}
                        setSelectedRegion={setSelectedRegion}
                    />
                    <DisabilityTypeFilter
                        selectedDisabilityType={selectedDisabilityType}
                        setSelectedDisabilityType={setSelectedDisabilityType}
                    />
                </HorizontalContainer>
            </FiltersContainer>
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
                    "검색된 시설이 없습니다"
                )}
            </StyledSearch>
    
            <StyledSelect>
                <FacilitySelectContainer>
                    {filteredActivities.length > 0 && (
                        <div>
                            시설 선택:
                            <select value={selectedFacilityState} onChange={handleFacilityChange}>
                                <option value="">선택하세요</option>
                                {filteredActivities.map((activity, index) => (
                                    <option key={index} value={activity.CLSSRM_NM}>
                                        {activity.CLSSRM_NM}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
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
            </StyledSelect>
        </div>
    );
    };
    
    export default FilteredActivityList;
    