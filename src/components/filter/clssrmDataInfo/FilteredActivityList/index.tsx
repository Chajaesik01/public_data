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

interface FilteredActivityListProps {
    setSelectedFacility: (facility: string) => void;
    setActivityInfo: (activity: Activity | null) => void;
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
`;

const FacilitySelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* 오른쪽 정렬 */
`;

const HorizontalContainer = styled.div`
    display: flex;
    gap: 10px; /* 필터 간의 간격 */
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

    p {
        margin-left: 30px;

    }
`;

const StyledSelect = styled.div`
    font-size: 30px;
    display: flex; /* flexbox를 사용하여 수평 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    position: relative; // 부모 요소에 상대 위치 설정
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
                const response = await fetch('./KS_DSPSN_LVLH_PHSTRN_CLSSRM_DATA_INFO_202407.csv');
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
        const selected = event.target.value;
        setSelectedFacility(selected);
        setSelectedFacilityState(selected);
        const selectedActivityInfo = activitiesRef.current.find(activity => activity.CLSSRM_NM === selected);
        setActivityInfo(selectedActivityInfo || null);
    };

    const handleSuggestionClick = (facilityName: string) => {
        setName(facilityName);
        setSelectedFacility(facilityName);
        setSelectedFacilityState(facilityName);
        const selectedActivityInfo = activitiesRef.current.find(activity => activity.CLSSRM_NM === facilityName);
        setActivityInfo(selectedActivityInfo || null);
        setSuggestions([]);
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
        event.preventDefault();
        handleReset();
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
                "검색된 시설이 없습니다"            )}
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
