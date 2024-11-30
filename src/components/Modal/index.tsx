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
  width: 400px;
  max-height: 80%;
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

interface ModalProps {
  isOpen: boolean;
  onClose: (selectedAddress?: string, facilityName?: string) => void;
}

const facilityAddresses: { [key: string]: string } = {
  '서울 중앙도서관': '서울특별시 중구 세종대로 110',
  '부산 해운대 해수욕장': '부산광역시 해운대구 해운대해변로 140',
  '대구 수성못': '대구광역시 수성구 수성못2길 100',
  '인천 송도 센트럴파크': '인천광역시 연수구 송도동 30-1',
  '광주 무등산': '광주광역시 동구 계족산길 297',
};

// 주소를 키로 하는 시설 이름 매핑
const addressToFacility: { [key: string]: string } = {
  '서울특별시 중구 세종대로 110': '서울 중앙도서관',
  '부산광역시 해운대구 해운대해변로 140': '부산 해운대 해수욕장',
  '대구광역시 수성구 수성못2길 100': '대구 수성못',
  '인천광역시 연수구 송도동 30-1': '인천 송도 센트럴파크',
  '광주광역시 동구 계족산길 297': '광주 무등산',
  '서울 중구 세종대로 110': '서울 중앙도서관',
  '부산 해운대 해수욕장': '부산 해운대 해수욕장',
  '대구 수성못': '대구 수성못',
  '인천 송도 센트럴파크': '인천 송도 센트럴파크',
  '광주 무등산': '광주 무등산',
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [addresses, setAddresses] = useState<any[]>([]);
  const [filteredAddresses, setFilteredAddresses] = useState<any[]>([]); // 필터링된 주소 목록

  useEffect(() => {
    if (searchTerm) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(searchTerm, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setAddresses(result);
          filterAddresses(result); // 주소를 필터링
        } else {
          setAddresses([]);
          setFilteredAddresses([]);
        }
      });
    } else {
      setAddresses([]);
      setFilteredAddresses([]);
    }
  }, [searchTerm]);

  const filterAddresses = (result: any[]) => {
    const validAddresses = Object.keys(addressToFacility);
    const filtered = validAddresses.filter(address =>
      address.includes(searchTerm) // 사용자가 입력한 값이 주소에 포함된 경우
    );
    setFilteredAddresses(filtered);
  };

  const handleSelectAddress = (addressName: string) => {
    const trimmedAddress = addressName.trim();
    const facilityName = addressToFacility[trimmedAddress];

    console.log('선택된 주소:', trimmedAddress);
    console.log('매핑된 시설 이름:', facilityName);

    onClose(trimmedAddress, facilityName); // 선택된 주소와 시설 이름을 전달
  };

  return (
    isOpen && (
      <ModalOverlay>
        <ModalContainer>
          <h3>주소 검색</h3>
          <input
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
