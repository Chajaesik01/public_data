import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Map from '../Map';
import Modal from '../Modal';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 20px auto;
  position: relative;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SuggestionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  background: white;
  width: 100%;
  position: relative;
  z-index: 10;
`;

const SuggestionItem = styled.li`
  cursor: pointer;
  padding: 10px;

  &:hover {
    background: #f1f1f1;
  }
`;

const InfoContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 10px;
  background-color: #f9f9f9;
  min-height: 80px; /* 최소 높이 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 내용이 없을 때 중앙 정렬 */
`;

const Form: React.FC = () => {
  const [inputs, setInputs] = useState({
    name: '',
    address: '',
    default_address: '',
    input4: '',
    input5: ''
  });
  const [address, setAddress] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const facilityAddresses: { [key: string]: { address: string; openInfo: string; hours: string; guide: string } } = {
    '서울 중앙도서관': {
      address: '서울특별시 중구 세종대로 110',
      openInfo: '오픈 정보: 서울 중앙도서관은 누구나 이용할 수 있습니다.',
      hours: '시간: 09:00 AM - 06:00 PM',
      guide: '안내: 문의는 전화로 해주세요.'
    },
    '부산 해운대 해수욕장': {
      address: '부산광역시 해운대구 해운대해변로 140',
      openInfo: '오픈 정보: 해수욕장 이용 시 주의하세요.',
      hours: '시간: 10:00 AM - 08:00 PM',
      guide: '안내: 안전요원에게 문의하세요.'
    },
    '대구 수성못': {
      address: '대구광역시 수성구 수성못2길 100',
      openInfo: '오픈 정보: 수성못은 자연 경관이 아름답습니다.',
      hours: '시간: 06:00 AM - 10:00 PM',
      guide: '안내: 자전거 대여가 가능합니다.'
    },
    '인천 송도 센트럴파크': {
      address: '인천광역시 연수구 송도동 30-1',
      openInfo: '오픈 정보: 공원 내 다양한 시설이 있습니다.',
      hours: '시간: 05:00 AM - 11:00 PM',
      guide: '안내: 반려동물 출입이 가능합니다.'
    },
    '광주 무등산': {
      address: '광주광역시 동구 계족산길 297',
      openInfo: '오픈 정보: 등산로가 잘 정비되어 있습니다.',
      hours: '시간: 06:00 AM - 08:00 PM',
      guide: '안내: 등산 시 안전장비를 착용하세요.'
    },
  };

  const mockFacilities = Object.keys(facilityAddresses);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });

    if (name === 'name') {
      fetchSuggestions(value);
    }
  };

  const fetchSuggestions = (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = mockFacilities.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputs({
      ...inputs,
      name: suggestion
    });
    setAddress(facilityAddresses[suggestion].address);
    setSuggestions([]);
  };

  const handleSelectAddress = (selectedAddress?: string, facilityName?: string) => {
    if (selectedAddress) {
      console.log('선택된 주소:', selectedAddress);
      setAddress(selectedAddress);
      
      if (facilityName) {
        console.log('시설 이름:', facilityName);
        setInputs(prevInputs => ({
          ...prevInputs,
          name: facilityName
        }));
      } else {
        console.log('해당 주소에 대한 시설 이름을 찾을 수 없습니다.');
      }
    }
    setIsModalOpen(false);
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // 여기에 필요한 제출 로직 추가
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>시설 이름</h3>
      <Input
        type="text"
        name="name"
        placeholder="시설 이름을 입력해주세요"
        value={inputs.name}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <SuggestionList>
          {suggestions.map((suggestion) => (
            <SuggestionItem key={suggestion} onClick={() => handleSelectSuggestion(suggestion)}>
              {suggestion}
            </SuggestionItem>
          ))}
        </SuggestionList>
      )}
      <h3>주소</h3>
      <Input
        type="text"
        name="address"
        placeholder="주소를 입력해주세요"
        value={address}
        onClick={() => setIsModalOpen(true)}
        readOnly
      />
      <h3>정보</h3>
      <InfoContainer>
        {inputs.name && facilityAddresses[inputs.name] ? (
          <>
            <h4>{inputs.name}</h4>
            <p>{facilityAddresses[inputs.name].openInfo}</p>
            <p>{facilityAddresses[inputs.name].hours}</p>
            <p>{facilityAddresses[inputs.name].guide}</p>
          </>
        ) : (
          <p>시설 이름이나 주소를 입력해주세요</p> // 정보가 없을 때 기본 메시지 표시
        )}
      </InfoContainer>
      <Map address={address} />
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleSelectAddress} 
      />
    </FormContainer>
  );
};

export default Form;
