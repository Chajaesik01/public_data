import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Nanum Gothic';
    src: url('https://cdn.jsdelivr.net/gh/google/fonts/ofl/nanumgothic/NanumGothic-Regular.ttf') format('truetype');
  }
`;

const StyledHeader = styled.div`
  margin-top: 4.63vh; /* 변환된 값 */
  margin-left: 6.25vw; /* 변환된 값 */
  width: 420px; /* 너비는 그대로 유지하거나 vw로 변환 가능 */
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 수평 방향 중앙 정렬 */
  align-items: center; /* 수직 방향 중앙 정렬 */
  color: rgba(0, 0, 0, 0.7); /* 연한 검정색 */
  font-size: 30px; /* 필요 시 vw로 변환 가능 */
  font-weight: bold; /* 폰트 두께 설정 */
  font-family: 'Nanum Gothic', sans-serif; /* 나눔고딕 폰트 사용 */
  margin-bottom: 1.85vh; /* 변환된 값 */
`;




const Header = () => {
  return (
    <>
      <GlobalStyle />
      <StyledHeader>장애인 체육시설 안내</StyledHeader>
    </>
  );
};

export default Header;
