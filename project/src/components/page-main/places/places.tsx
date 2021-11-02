import React from 'react';
import PlaceCard from '../../place-card/place-card';
import {Offers, Offer} from '../../../types/offer';

type PlacesProps = {
  offers: Offers;
  updatePlaceInfo: (value: Offer) => void;
  updateActivePlace: (value: number | null) => void;
  activePlace: number | null;
};

function Places({offers, updatePlaceInfo, activePlace, updateActivePlace}: PlacesProps): JSX.Element {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in Amsterdam</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
          Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={0}>Popular</li>
          <li className="places__option" tabIndex={0}>Price: low to high</li>
          <li className="places__option" tabIndex={0}>Price: high to low</li>
          <li className="places__option" tabIndex={0}>Top rated first</li>
        </ul>
      </form>

      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer: Offer) =>
          <PlaceCard offer={offer} key={offer.id} updateActivePlace={updateActivePlace} activePlace={activePlace} updatePlaceInfo={updatePlaceInfo}/>)}
      </div>
    </section>
  );
}

export default Places;
