import React from 'react';
import {useRef, useEffect} from 'react';
import useMap from '../../hooks/use-map';
import {connect, ConnectedProps} from 'react-redux';
import {Location, Points} from '../../types/map';
import leaflet, {Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import {State} from '../../types/state';
import { getActivePlace } from '../../store/app-process/selectors';

type MapProps = {
  city: Location;
  points: Points | null;
  height: number;
};

const mapStateToProps = (state: State) => ({
  activePlace: getActivePlace(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MapProps;

function Map(props: ConnectedComponentProps): JSX.Element {
  const {city, points, height, activePlace} = props;
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

export {Map};
export default connector(Map);

