import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 70%;
  height: 70%;
  position: relative;
  margin: 10vh 5vw;
`;

interface MapCoordinates {
  latitude: number;
  longitude: number;
}

const Map: React.FC<{ address?: string; name?: string }> = ({ address, name }) => {
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
    const loadKakaoMap = (latitude: number, longitude: number) => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 4,
      };
      const mapInstance = new window.kakao.maps.Map(container, options);
      setMap(mapInstance);
    };

    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            loadKakaoMap(latitude, longitude);
          },
          () => {
            // 기본 위치로 지도 초기화 (서울)
            loadKakaoMap(37.5665, 126.978);
          }
        );
      } else {
        loadKakaoMap(37.5665, 126.978);
      }
    };

    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=ababd67aa0efce0f7ba40f974d4462c3&libraries=services';
    script.async = true;
    script.onload = getCurrentPosition;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (address && map) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const latitude = result[0].y;
          const longitude = result[0].x;
          const moveLatLng = new window.kakao.maps.LatLng(latitude, longitude);
          
          // 로그 출력
          console.log('주소:', address);
          console.log('위도:', latitude, '경도:', longitude);
          
          map.setCenter(moveLatLng); // 지도 중심 이동

          if (marker) {
            marker.setMap(null); // 기존 마커 제거
          }
          const newMarker = new window.kakao.maps.Marker({
            position: moveLatLng,
            map: map,
          });
          setMarker(newMarker);
        } else {
          console.error('주소를 찾을 수 없습니다.'); // 오류 메시지
        }
      });
    }
  }, [address, map]); // address와 map이 변경될 때마다 실행

  useEffect(() => {
    if (name && map) {
      // 주소를 name에 기반하여 업데이트하려면, 여기서 로직 추가
      // 예를 들어, name에 따라 특정 주소를 설정하고 지도를 업데이트할 수 있습니다.
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(name, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const latitude = result[0].y;
          const longitude = result[0].x;
          const moveLatLng = new window.kakao.maps.LatLng(latitude, longitude);

          console.log('이름:', name);
          console.log('위도:', latitude, '경도:', longitude);

          map.setCenter(moveLatLng); // 지도 중심 이동

          if (marker) {
            marker.setMap(null); // 기존 마커 제거
          }
          const newMarker = new window.kakao.maps.Marker({
            position: moveLatLng,
            map: map,
          });
          setMarker(newMarker);
        } else {
          console.error('이름에 해당하는 주소를 찾을 수 없습니다.'); // 오류 메시지
        }
      });
    }
  }, [name, map]); // name과 map이 변경될 때마다 실행

  return (
    <MapContainer id="map">
      {/* 지도 표시할 div */}
    </MapContainer>
  );
};

export default Map;
