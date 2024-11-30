// SubmitButton.tsx
import React from 'react';
import styled from 'styled-components';

// props의 타입 정의
interface SubmitButtonProps {
  onClick?: () => void; // 클릭 이벤트 핸들러
  children: React.ReactNode; // 버튼에 표시할 내용
  type?: "button" | "submit" | "reset"; // 버튼 타입
}

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// SubmitButton 컴포넌트
const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, children, type = "button" }) => {
  return <Button onClick={onClick} type={type}>{children}</Button>;
};

export default SubmitButton;
