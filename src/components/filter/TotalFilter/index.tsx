import React from 'react';
import styled from 'styled-components';

interface TotalFilterProps {
    selectedProgram: string;
    setSelectedProgram: (program: string) => void;
    onClearMap: () => void; // 맵 초기화 함수 추가
}

const TotalFilter: React.FC<TotalFilterProps> = ({ 
    selectedProgram, 
    setSelectedProgram, 
    onClearMap // props로 추가
}) => {
    const handleProgramChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const program = event.target.value;
        setSelectedProgram(program); // 선택된 프로그램을 부모에 전달
        onClearMap(); // 맵 초기화 함수 호출
    };

    return (
        <Container>
            <Label>
                {/* 시설 옵션을 선택하세요  */}
                <Select 
                    value={selectedProgram} 
                    onChange={handleProgramChange}
                >
                    <option value="">시설 옵션을 선택하세요</option>
                    <option value="장애인 생활체육 교실">장애인 생활체육 교실</option>
                    <option value="장애인스포츠강좌이용권시설"> 장애인스포츠강좌이용권시설</option>
                </Select>
            </Label>
        </Container>
    );
};

const Container = styled.div`
    margin-top: 50px;
    margin-bottom: 20px;
`;

const Label = styled.label`
    margin-right: 10px;
    font-size: 18px; /* 라벨 글자 크기 */
    color: #333; /* 라벨 글자 색상 */
`;

const Select = styled.select`
    margin-left: 5px;
    padding: 10px; /* 패딩 추가 */
    border: 1px solid #ccc; /* 테두리 색상 */
    border-radius: 4px; /* 모서리 둥글게 */
    font-size: 16px; /* 글자 크기 */
    color: #333; /* 글자 색상 */
    background-color: white; /* 배경색 */
    
    &:focus {
        border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
        outline: none; /* 포커스 시 기본 테두리 제거 */
    }
`;

export default TotalFilter;
