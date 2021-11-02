import React from 'react';
import {useRef, useEffect} from 'react';
import useMap from '../../hooks/useMap';
import {Location, Points} from '../../types/map';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';


type MapProps = {
  city: Location;
  points: Points;
  activePlace: number | null;
};

function Map({city, points, activePlace}:MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultMarkerIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [27, 39],
    iconAnchor: [20, 40],
  });

  const currentMarkerIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [27, 39],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: (activePlace === point.id)? currentMarkerIcon : defaultMarkerIcon,
          })
          .addTo(map);
      });
    }
  },[map, points]);

  return(
    <section className="cities__map map"
      style={{height: '823px'}}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
