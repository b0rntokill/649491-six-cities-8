import {useEffect, useState, MutableRefObject} from 'react';
import leaflet from 'leaflet';
import {Map} from 'leaflet';
import {Location} from '../types/map';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: Location,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instanceMap = new Map(mapRef.current, {
        center: {
          lat: city.latitude,
          lng: city.longitude,
        },
        zoom: 10,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instanceMap);

      setMap(instanceMap);
    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
