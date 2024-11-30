import React, { useEffect, useState, useRef } from 'react';
import ActivityFilter from '../ActivityFilter'; 
import RegionFilter from '../RegionFilter'; 
import DisabilityTypeFilter from '../DisabilityTypeFilter'; 
import TotalFilter from '../TotalFilter'; 
import ClssrmDataInfo, { Activity } from '../../../data/excel/ClssrmDataInfo'; 
import styled from 'styled-components'; 

interface FilteredActivityListProps {
    setSelectedFacility: (facility: string) => void; 
    setActivityInfo: (activity: Activity | null) => void; 
}

const SuggestionsList = styled.ul`
    border: 1px solid #ccc;
    border-radius: 4px;
    list-style: none;
    padding: 0;
    margin: 5px 0 0 0;
    position: absolute; 
    background: white; 
    z-index: 1000; 
`;

const SuggestionItem = styled.li`
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0; 
    }
`;

const FilteredActivityList: React.FC<FilteredActivityListProps> = ({ setSelectedFacility, setActivityInfo }) => {
    const activitiesRef = useRef<Activity[]>([]);
    const dataLoadedRef = useRef(false); 
    const [selectedActivity, setSelectedActivity] = useState<string>('');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedDisabilityType, setSelectedDisabilityType] = useState<string>('');
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
    const [selectedProgram, setSelectedProgram] = useState<string>(''); 

    const [name, setName] = useState<string>(''); 
    const [suggestions, setSuggestions] = useState<string[]>([]); 

    const handleDataLoaded = (data: Activity[]) => {
        if (!dataLoadedRef.current) {
            activitiesRef.current = data; 
            dataLoadedRef.current = true; 
            console.log('로드된 데이터:', activitiesRef.current); // 로드된 데이터 출력
            
            // 모든 시설을 초기화하여 선택할 수 있도록 설정
            setFilteredActivities(data); // 모든 시설을 설정
        }
    };

    useEffect(() => {
        if (dataLoadedRef.current) {
            const updatedFilteredActivities = activitiesRef.current.filter(activity =>
                (selectedActivity === '' || activity.ITEM_NM === selectedActivity) &&
                (selectedRegion === '' || activity.CTPRVN_NM === selectedRegion) &&
                (selectedDisabilityType === '' || activity.TROBL_TY_NM === selectedDisabilityType)
            );
            console.log('필터링된 활동:', updatedFilteredActivities);
            setFilteredActivities(updatedFilteredActivities);
        }
    }, [selectedActivity, selectedRegion, selectedDisabilityType]);

    useEffect(() => {
        // filteredActivities가 변경될 때마다 suggestions 업데이트
        setSuggestions(filterSuggestions(name));
    }, [filteredActivities, name]);

    const filterSuggestions = (value: string) => {
        if (value) {
            const filteredSuggestions = filteredActivities
                .filter(activity => 
                    activity.CLSSRM_NM && // CLSSRM_NM이 정의되어 있는지 확인
                    activity.CLSSRM_NM.toLowerCase().includes(value.toLowerCase())
                )
                .map(activity => activity.CLSSRM_NM); // 필터링된 활동에서 시설 이름만 추출

            console.log('필터링된 제안:', filteredSuggestions); // 필터링된 제안 목록 출력
            return filteredSuggestions;
        } else {
            return [];
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        // suggestions는 useEffect에서 자동으로 업데이트됨
    };
    
    const handleFacilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        if (selected) {
            setSelectedFacility(selected); 

            const selectedActivityInfo = activitiesRef.current.find(activity => activity.CLSSRM_NM === selected);
            setActivityInfo(selectedActivityInfo || null);
            
            // 선택한 시설을 filteredActivities에서 제거
            setFilteredActivities(prev =>
                prev.filter(activity => activity.CLSSRM_NM !== selected)
            );
        }
    };

    const handleSuggestionClick = (facilityName: string) => {
        setName(facilityName); // 클릭한 시설 이름으로 입력 필드 업데이트
        setSelectedFacility(facilityName); // 시설 선택
        const selectedActivityInfo = activitiesRef.current.find(activity => activity.CLSSRM_NM === facilityName);
        setActivityInfo(selectedActivityInfo || null);
        setSuggestions([]); // 제안 목록 비우기
    };

    const handleReset = () => {
        setSelectedActivity('');
        setSelectedRegion('');
        setSelectedDisabilityType('');
        setSelectedProgram('');
        setSelectedFacility('');
        setActivityInfo(null);
        setName('');
        setSuggestions([]);
        setFilteredActivities(activitiesRef.current); // 모든 시설 다시 설정
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleReset(); 
    };

    return (
        <div style={{ position: 'relative' }}>
            <ClssrmDataInfo onDataLoaded={handleDataLoaded} />

            <TotalFilter 
                selectedProgram={selectedProgram}
                setSelectedProgram={setSelectedProgram}
                setSelectedActivity={setSelectedActivity}
                setSelectedRegion={setSelectedRegion}
                setSelectedDisabilityType={setSelectedDisabilityType}
            />

            {selectedProgram === "장애인 생활체육교실" && (
                <>
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

                    <label>
                        시설 선택:
                        <select onChange={handleFacilityChange} value="">
                            <option value="">선택하세요</option>
                            {filteredActivities.map((activity, index) => (
                                <option key={`${activity.CLSSRM_NM}-${index}`} value={activity.CLSSRM_NM}>
                                    {activity.CLSSRM_NM}
                                </option>
                            ))}
                        </select>
                    </label>

                    <form onSubmit={handleSubmit}>
                        <label>
                            시설 이름 검색 : 
                            <input 
                                type="text" 
                                value={name} 
                                onChange={handleNameChange} 
                            />
                        </label>
                        <button type="submit">제출</button>
                        <button type="button" onClick={handleReset}>
                            초기화
                        </button>
                    </form>

                    {suggestions.length > 0 && (
    <SuggestionsList>
        {suggestions
            .filter(facilityName => facilityName !== name) // 이미 선택된 값을 제외
            .map((facilityName, index) => (
                <SuggestionItem key={index} onClick={() => handleSuggestionClick(facilityName)}>
                    {facilityName}
                </SuggestionItem>
            ))}
    </SuggestionsList>
)}
{suggestions.length === 0 && name && (
    <div>검색된 시설이 없습니다.</div>
)}
                </>
            )}
        </div>
    );
};

export default FilteredActivityList;
