import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
  min-height: 20%;
  max-height: 50%;
  overflow-y: auto;
  z-index: 1001;
`;

const CloseButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #0056b3;
  }
`;

const AddressList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AddressItem = styled.li`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  &:hover {
    background: #f1f1f1;
  }
`;

const InputField = styled.input`
  height: 40px; /* 높이 설정 */
  padding: 5px; /* 안쪽 여백 */
  border: 1px solid #ccc; /* 테두리 */
  border-radius: 4px; /* 둥근 모서리 */
  width: 100%; /* 너비 100% */
  box-sizing: border-box; /* 패딩과 테두리를 포함한 너비 계산 */

  &:focus {
    border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
    outline: none; /* 기본 포커스 아웃라인 제거 */
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: (selectedAddress?: string, facilityName?: string) => void;
}

const addressToFacility: { [key: string]: string } = {
  '서울특별시 중구 세종대로 110': '서울 중앙도서관',
  '부산광역시 해운대구 해운대해변로 140': '부산 해운대 해수욕장',
  '대구광역시 수성구 수성못2길 100': '대구 수성못',
  '인천광역시 연수구 송도동 30-1': '인천 송도 센트럴파크',
  '광주광역시 동구 계족산길 297': '광주 무등산',
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(searchTerm, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          filterAddresses(result);
        } else {
          setFilteredAddresses([]);
        }
      });
    } else {
      setFilteredAddresses([]);
    }
  }, [searchTerm]);

  const filterAddresses = (result: any[]) => {
    const validAddresses = Object.keys(addressToFacility);
    const filtered = validAddresses.filter(address =>
      address.includes(searchTerm)
    );
    setFilteredAddresses(filtered);
  };

  const handleSelectAddress = (addressName: string) => {
    const facilityName = addressToFacility[addressName.trim()];
    onClose(addressName, facilityName);
  };

  return (
    isOpen && (
      <ModalOverlay onClick={() => onClose()}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <h3>주소 검색</h3>
          <InputField
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="주소를 입력하세요"
          />
          <AddressList>
            {filteredAddresses.map((address) => (
              <AddressItem 
                key={address} 
                onClick={() => handleSelectAddress(address)}>
                {address}
              </AddressItem>
            ))}
          </AddressList>
          <CloseButton onClick={() => onClose()}>완료</CloseButton>
        </ModalContainer>
      </ModalOverlay>
    )
  );
};

export default Modal;
