import leaflet, { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import useMap from '../../hooks/use-map';
import { getActivePlace } from '../../store/app-process/selectors';
import { Location, Points } from '../../types/map';

type MapProps = {
  city: Location;
  points: Points | null;
  height: number;
};

function Map(props: MapProps): JSX.Element {
  const {city, points, height} = props;
  const activePlace = useSelector(getActivePlace);

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
      const markers: Marker<unknown>[] = points.map((point) =>
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: (activePlace === point.id)? currentMarkerIcon : defaultMarkerIcon,
          }),
      );

      markers.forEach((marker) => marker.addTo(map));

      map.flyTo({lat: city.latitude, lng: city.longitude});

      return(()=> {
        markers.forEach((marker) => marker.removeFrom(map));
      });
    }

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
