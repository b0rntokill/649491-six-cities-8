import React, {useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Places from '../places/places';
import PlacesEmpty from '../places/places-empty';
import SortingOptions from './sorting-options/sorting-options';
import Locations from './locations/locations';
import Map from '../map/map';
import {Offer, Offers} from '../../types/offer';
import {Points, Location} from '../../types/map';
import {State} from '../../types/state';
import {DEFAULT_SORT_TYPE} from '../../const';

const mapStateToProps = ({selectedCity, offers}: State) => ({
  offers,
  selectedCity,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Main(props: PropsFromRedux): JSX.Element {
  const {selectedCity, offers} = props;
  const [sortType, setSortType] = useState<string>(DEFAULT_SORT_TYPE);

  const updateSortType = (type: string): void => {
    setSortType(type);
  };

  const EMPTY_OFFERS_CLASS = 'page__main--index-empty';

  const selectedCityOffers = offers.filter((offer: Offer) => offer.city.name === selectedCity);

  const getSortOffers = (type: string, places: Offers) => {
    switch (type) {
      case 'Price: low to high':
        return places.slice().sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return places.slice().sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return places.slice().sort((a, b) => Number(b.rating) -  Number(a.price));
      default:
        return places;
    }
  };

  const selectedSortOffers = getSortOffers(sortType, selectedCityOffers);

  let city: Location | null = null;
  const points: Points = [];

  if (selectedCityOffers.length) {
    city = selectedCityOffers[0].city.location;

    selectedCityOffers.forEach((offer) => points.push({
      id: offer.id,
      location: offer.location,
    }));
  }

  return (
    <main className={`page__main page__main--index ${selectedCityOffers? EMPTY_OFFERS_CLASS : ''}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations/>
      </div>
      <div className="cities">
        <div className="cities__places-container container">

          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{selectedCityOffers.length} places to stay in {selectedCity}</b>

            <SortingOptions sortType={sortType} updateSortType={updateSortType}/>

            {selectedSortOffers.length?
              <Places
                offers={selectedSortOffers} pageClass={'cities__places-list'}
              />
              : <PlacesEmpty/>}
          </section>
          <div className="cities__right-section">
            {city?
              <Map city={city} points={points} height={873}/> : null}
          </div>
        </div>
      </div>
    </main>
  );
}

export {Main};
export default connector(Main);
