import React from 'react';

interface ActivityFilterProps {
  selectedActivity: string;
  setSelectedActivity: React.Dispatch<React.SetStateAction<string>>;
}

const ActivityFilter: React.FC<ActivityFilterProps> = ({ selectedActivity, setSelectedActivity }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedActivity(e.target.value); // 부모 컴포넌트의 상태 업데이트
    };

    return (
        <div>
            <label htmlFor="activity-select" style={{ marginRight: '10px' }}>
                종목 선택:
            </label>
            <select 
                id="activity-select" 
                value={selectedActivity} 
                onChange={handleChange} // 변경 시 핸들러 호출
                style={{ padding: '5px', fontSize: '16px' }}
            >
                <option value="">모든 종목</option>
        <option value="기타종목">기타종목</option>
        <option value="복싱">복싱</option>
        <option value="헬스">헬스</option>
        <option value="에어로빅">에어로빅</option>
        <option value="수영">수영</option>
        <option value="필라테스">필라테스</option>
        <option value="태권도">태권도</option>
        <option value="요가">요가</option>
        <option value="유도">유도</option>
        <option value="축구">축구</option>
        <option value="배드민턴">배드민턴</option>
        <option value="탁구">탁구</option>
        <option value="테니스">테니스</option>
        <option value="야구">야구</option>
        <option value="검도">검도</option>
        <option value="롤러인라인">롤러인라인</option>
        <option value="농구">농구</option>
        <option value="승마">승마</option>
        <option value="빙상">빙상</option>
        <option value="골프">골프</option>
        <option value="볼링">볼링</option>
        <option value="종합체육시설">종합체육시설</option>
        <option value="합기도">합기도</option>
        <option value="댄스">댄스</option>
        <option value="배구">배구</option>
        <option value="줄넘기">줄넘기</option>
        <option value="펜싱">펜싱</option>
        <option value="스쿼시">스쿼시</option>
        <option value="발레">발레</option>
            </select>
        </div>
    );
};

export default ActivityFilter;
