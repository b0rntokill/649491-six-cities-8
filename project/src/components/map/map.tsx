import React from 'react';
import {useRef, useEffect} from 'react';
import useMap from '../../hooks/use-map';
import {Location, Points} from '../../types/map';
import leaflet, {Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';


type MapProps = {
  city: Location;
  points: Points | null;
  activePlace: number | null;
  height: number;
};

function Map({city, points, activePlace, height}:MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const heightStr = `${height.toString()}px`;

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
    if (map && points) {
      const markers: Marker<unknown>[] = points.map((point) => {
        return leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: (activePlace === point.id)? currentMarkerIcon : defaultMarkerIcon,
          })
      });

      markers.forEach(marker => marker.addTo(map));

      return(()=> {
        markers.forEach(marker => marker.removeFrom(map));
      })
    };

  },[map, points, activePlace]);

  return(
    <section className="cities__map map"
      style={{height: heightStr}}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
