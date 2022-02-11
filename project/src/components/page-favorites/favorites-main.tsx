import React from 'react';
import { useSelector } from 'react-redux';
import { getOffers } from '../../store/app-data/selectors';
import { Offer } from '../../types/offer';
import Favorites from './favorites/favorites';
import FavoritesEmpty from './favorites/favorites-empty';

function FavoritesMain(): JSX.Element {
  const offers = useSelector(getOffers);
  const favoriteOffers = offers.filter((offer: Offer) => offer.isFavorite);

  if (favoriteOffers.length) {
    return (
      <Favorites favoriteOffers={favoriteOffers}/>
    );
  }

  return (
    <FavoritesEmpty/>
  );
}

export default FavoritesMain;
