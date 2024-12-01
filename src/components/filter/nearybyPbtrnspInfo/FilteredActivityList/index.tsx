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

const SuggestionsList = styled.div`
    border: 1px solid #ccc;
    background-color: white;
    position: absolute;
    z-index: 1;
    max-height: 150px;
    overflow-y: auto;
`;

const SuggestionItem = styled.div`
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
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
        if (selected) {
            setSelectedFacility(selected);
            const selectedActivityInfo = activitiesRef.current.find(activity => activity.SVCH_FCLTY_NM === selected);
            setNFacilityService(selectedActivityInfo || null);
            setFilteredActivities(prev => prev.filter(activity => activity.SVCH_FCLTY_NM !== selected));
        }
    };

    const handleReset = () => {
        setSelectedActivity('');
        setSelectedRegion('');
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
                    <label>
                        시설 선택:
                        <select onChange={handleFacilityChange} value="">
                            <option value="">선택하세요</option>
                            {filteredActivities.map((activity, index) => (
                                <option key={`${activity.SVCH_FCLTY_NM}-${index}`} value={activity.SVCH_FCLTY_NM}>
                                    {activity.SVCH_FCLTY_NM}
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
                </>
            )}
        </div>
    );
};

export default NFilteredActivityList;
