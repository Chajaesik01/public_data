import React from 'react';

interface TotalFilterProps {
    selectedProgram: string;
    setSelectedProgram: (program: string) => void;
}

const TotalFilter: React.FC<TotalFilterProps> = ({ 
    selectedProgram, 
    setSelectedProgram 
}) => {
    const handleProgramChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const program = event.target.value;
        setSelectedProgram(program); // 선택된 프로그램을 부모에 전달
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px' }}>
                    정책명
                    <select 
                        value={selectedProgram} 
                        onChange={handleProgramChange} 
                        style={{ marginLeft: '5px' }}
                    >
                        <option value="">선택하세요</option>
                        <option value="장애인 생활체육교실">장애인 생활체육교실</option>
                        <option value="전국 공공 체육시설 데이터">전국 공공 체육시설 데이터</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default TotalFilter;
