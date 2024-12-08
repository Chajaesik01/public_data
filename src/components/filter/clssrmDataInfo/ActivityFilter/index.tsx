import React from 'react';
import styled from 'styled-components';

export interface ActivityFilterProps {
  selectedActivity: string;
  setSelectedActivity: React.Dispatch<React.SetStateAction<string>>;
}

// Styled select component
const StyledSelect = styled.select`
    min-width: 200px; /* 최소 너비 설정 */
    max-height: 40px; /* 고정 높이 설정 */
    padding: 0 10px; /* 수평 패딩만 추가 */
    border: 1px solid #ccc; /* 테두리 색상 */
    border-radius: 4px; /* 모서리 둥글게 */
    font-size: 32px; /* 글자 크기 */
    color: #333; /* 글자 색상 */
    background-color: white; /* 배경색 */

    &:focus {
        border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
        outline: none; /* 포커스 시 기본 테두리 제거 */
    }

@media (max-width: 768px) {
    display: flex;
    max-width: 70vw;
    min-width: 150px; /* 모바일에서 최소 너비 조정 */
    max-height: 35px; /* 모바일에서 높이 조정 */
    font-size: 24px; /* 모바일에서 글자 크기 조정 */
    padding: 0 8px; /* 모바일에서 패딩 조정 */
    margin: 0 auto; /* 중앙 정렬을 위한 자동 여백 설정 */
}

`;

const ActivityFilter: React.FC<ActivityFilterProps> = ({ selectedActivity, setSelectedActivity }) => {
  return (
    <StyledSelect value={selectedActivity} onChange={e => setSelectedActivity(e.target.value)}>
      <option value="">종목을 선택하세요</option>
      <option value="검도">검도</option>
      <option value="게이트볼">게이트볼</option>
      <option value="골볼">골볼</option>
      <option value="궁도">궁도</option>
      <option value="기타">기타</option>
      <option value="농구">농구</option>
      <option value="다트">다트</option>
      <option value="당구">당구</option>
      <option value="댄스스포츠">댄스스포츠</option>
      <option value="럭비">럭비</option>
      <option value="론볼">론볼</option>
      <option value="바둑">바둑</option>
      <option value="배구">배구</option>
      <option value="배드민턴">배드민턴</option>
      <option value="보치아">보치아</option>
      <option value="볼링">볼링</option>
      <option value="사격">사격</option>
      <option value="사이클">사이클</option>
      <option value="수영">수영</option>
      <option value="슐런">슐런</option>
      <option value="승마">승마</option>
      <option value="야구소프트볼">야구소프트볼</option>
      <option value="양궁">양궁</option>
      <option value="역도">역도</option>
      <option value="요트">요트</option>
      <option value="유도">유도</option>
      <option value="육상">육상</option>
      <option value="조정">조정</option>
      <option value="축구">축구</option>
      <option value="컬링">컬링</option>
      <option value="탁구">탁구</option>
      <option value="태권도">태권도</option>
      <option value="테니스">테니스</option>
      <option value="파크골프">파크골프</option>
      <option value="펜싱">펜싱</option>
      <option value="플라잉디스크">플라잉디스크</option>
      <option value="플로어볼">플로어볼</option>
    </StyledSelect>
  );
};

export default ActivityFilter;
