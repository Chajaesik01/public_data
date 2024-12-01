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
        if (selected) {
            setSelectedFacility(selected);
            const selectedActivityInfo = activitiesRef.current.find(activity => activity.CLSSRM_NM === selected);
            setActivityInfo(selectedActivityInfo || null);
            setFilteredActivities(prev => prev.filter(activity => activity.CLSSRM_NM !== selected));
        }
    };

    const handleSuggestionClick = (facilityName: string) => {
        setName(facilityName);
        setSelectedFacility(facilityName);
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
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleReset();
    };

    return (
        <div style={{ position: 'relative' }}>
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
                        .filter(facilityName => facilityName !== name)
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

            {/* 필터링된 결과를 선택할 수 있는 드롭다운 추가 */}
            {filteredActivities.length > 0 && (
                <div>
                    <h4>시설 선택:</h4>
                    <select onChange={e => handleFacilityChange(e)}>
                        <option value="">선택하세요</option>
                        {filteredActivities.map((activity, index) => (
                            <option key={index} value={activity.CLSSRM_NM}>
                                {activity.CLSSRM_NM}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default FilteredActivityList;
