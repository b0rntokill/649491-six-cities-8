import React from 'react';
import FavoriteCard from './favorite-card/favorite-card';
import {Offer, Offers} from '../../../types/offer';

type FavoriteListProps = {
  offers: Offers;
  updatePlaceInfo: (value: Offer) => void;
};

function FavoriteList({offers, updatePlaceInfo}: FavoriteListProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer: Offer) =>
          <FavoriteCard offer={offer} key={offer.id} updatePlaceInfo={updatePlaceInfo}/>)}
      </div>
    </li>
  );
}

export default FavoriteList;
