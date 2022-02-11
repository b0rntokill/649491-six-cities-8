import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DEFAULT_SORT_TYPE } from '../../const';
import { getIsDataLoaded, getOffers } from '../../store/app-data/selectors';
import { getSelectedCity } from '../../store/app-process/selectors';
import { Location, Points } from '../../types/map';
import { Offer } from '../../types/offer';
import { getSortOffers } from '../../utils';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import Map from '../map/map';
import Places from '../places/places';
import PlacesEmpty from '../places/places-empty';
import Locations from './locations/locations';
import SortingOptions from './sorting-options/sorting-options';

const EMPTY_OFFERS_CLASS = 'page__main--index-empty';

function Main(): JSX.Element {
  const offers = useSelector(getOffers);
  const selectedCity = useSelector(getSelectedCity);
  const isDataLoaded = useSelector(getIsDataLoaded);
  const [sortType, setSortType] = useState<string>(DEFAULT_SORT_TYPE);

  const updateSortType = (type: string): void => {
    setSortType(type);
  };

  const selectedCityOffers = offers.filter((offer: Offer) => offer.city.name === selectedCity);

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

  if (!isDataLoaded) {
    return (
      <main className={`page__main page__main--index ${selectedCityOffers? EMPTY_OFFERS_CLASS : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations/>
        </div>

        <div className="cities">
          <div className="cities__places-container container">

            <LoadingSpinner/>

          </div>
        </div>
      </main>
    );
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

export default Main;
