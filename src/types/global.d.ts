interface Window {
    kakao: {
      maps: {
        Marker: any;
        Map: any; // 정확한 타입으로 수정 가능
        LatLng: any; // 정확한 타입으로 수정 가능
        services: {
          Geocoder: any; // 정확한 타입으로 수정 가능
          Status: {
            OK: string; // 정확한 타입으로 수정 가능
          };
        };
      };
    };
  }