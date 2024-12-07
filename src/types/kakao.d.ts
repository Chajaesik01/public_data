declare global {
    interface Window {
      kakao: {
        maps: {
          load: (callback: () => void) => void;
          Map: any;
          LatLng: any;
          Marker: any;
          services: {
            Geocoder: any;
            Status: {
              OK: string;
            };
          };
        };
      };
    }
  }
  
  export {};