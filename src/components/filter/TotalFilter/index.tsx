// TotalFilter.tsx
import React from 'react';

interface TotalFilterProps {
    selectedProgram: string;
    setSelectedProgram: (program: string) => void;
    setSelectedActivity: (activity: string) => void;
    setSelectedRegion: (region: string) => void;
    setSelectedDisabilityType: (type: string) => void;
}

const TotalFilter: React.FC<TotalFilterProps> = ({ 
    selectedProgram, setSelectedProgram, 
    setSelectedActivity, setSelectedRegion, 
    setSelectedDisabilityType 
}) => {
    const handleProgramChange = (program: string) => {
        setSelectedProgram(program);
        if (program === "장애인 생활체육교실") {
            // 필터들을 자동으로 설정
            setSelectedActivity(''); // 모든 활동으로 초기화
            setSelectedRegion(''); // 모든 지역으로 초기화
            setSelectedDisabilityType(''); // 모든 장애 유형으로 초기화
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>
                정책명
                <select value={selectedProgram} onChange={(e) => handleProgramChange(e.target.value)} style={{ marginLeft: '5px' }}>
                    <option value="">선택하세요</option>
                    <option value="장애인 생활체육교실">장애인 생활체육교실</option>
                    <option value="다른 정책명">다른 정책명</option>
                    {/* 다른 프로그램 옵션 추가 가능 */}
                </select>
            </label>
        </div>
    );
};

export default TotalFilter;
