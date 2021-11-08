import React from 'react';
import PlaceCard from '../place-card/place-card';
import {Offer, Offers} from '../../types/offer';

type PlacesProps = {
  offers: Offers;
  pageClass: string;
};

function Places({offers, pageClass}: PlacesProps): JSX.Element {
  return (
    <div className={`${pageClass} places__list`}>
      {offers.map((offer: Offer) =>
        <PlaceCard offer={offer} key={offer.id} />)}
    </div>
  );
}

export default Places;
