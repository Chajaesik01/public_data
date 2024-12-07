import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 90%;
  height: 90%;
  position: relative;
  margin-left: 1.5vw;
  margin-top: 2vh;
`;

const Map: React.FC<{ address?: string }> = ({ address }) => {
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
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAPS_API_KEY}&libraries=services`;script.onload = getCurrentPosition;
    script.async = true;
    script.onload = getCurrentPosition;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (address) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const latitude = result[0].y;
          const longitude = result[0].x;
          const moveLatLng = new window.kakao.maps.LatLng(latitude, longitude);
          
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
    } else if (map) {
      // address가 undefined일 경우 현재 위치로 이동
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const moveLatLng = new window.kakao.maps.LatLng(latitude, longitude);
          map.setCenter(moveLatLng); // 지도 중심 이동

          if (marker) {
            marker.setMap(null); // 기존 마커 제거
          }
          const newMarker = new window.kakao.maps.Marker({
            position: moveLatLng,
            map: map,
          });
          setMarker(newMarker);
        },
        () => {
          // 기본 위치로 지도 초기화 (서울)
          const defaultLatLng = new window.kakao.maps.LatLng(37.5665, 126.978);
          map.setCenter(defaultLatLng); // 지도 중심 이동
        }
      );
    }
  }, [address, map]);

  return (
    <MapContainer id="map">
      {/* 지도 표시할 div */}
    </MapContainer>
  );
};

export default Map;
