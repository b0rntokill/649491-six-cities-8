import React from 'react';
import PlaceCard from '../place-card/place-card';
import {Offer, Offers} from '../../types/offer';

type PlacesProps = {
  offers: Offers;
  pageClass: string;
  updateActivePlace: (value: number | null) => void;
  activePlace: number | null;
};

function Places({offers, activePlace, updateActivePlace, pageClass}: PlacesProps): JSX.Element {
  return (
    <div className={`${pageClass} places__list`}>
      {offers.map((offer: Offer) =>
        <PlaceCard offer={offer} key={offer.id} updateActivePlace={updateActivePlace} activePlace={activePlace}/>)}
    </div>
  );
}

export default Places;
