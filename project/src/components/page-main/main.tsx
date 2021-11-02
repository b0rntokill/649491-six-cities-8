import React from 'react';
import {useState} from 'react';
import Places from './places/places';
import PlacesEmpty from './places/places-empty';
import Map from '../map/map';
import {Offers, Offer} from '../../types/offer';
import {Points} from '../../types/map';

type PageMainProps = {
  offers: Offers;
  updatePlaceInfo: (value: Offer) => void;
};

function Main({offers, updatePlaceInfo}: PageMainProps): JSX.Element {
  const [activePlace, setActivePlace] = useState<number | null>(null);

  function updateActivePlace(value: number | null): void {
    setActivePlace(value);
  }

  const city = offers[0].city.location;
  const points: Points = [];

  offers.forEach((offer) => points.push({
    id: offer.id,
    location: offer.location,
  }));

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item tabs__item--active">
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Dusseldorf</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">

          {offers.length?
            <Places offers={offers} updatePlaceInfo={updatePlaceInfo} activePlace={activePlace} updateActivePlace={updateActivePlace}/>
            : <PlacesEmpty/>}

          <div className="cities__right-section">
            <Map city={city} points={points} activePlace={activePlace}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
