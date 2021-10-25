import React from 'react';
import Favorites from './favorites/favorites';
import FavoritesEmpty from './favorites/favorites-empty';
import {Offer, Offers} from '../../types/offer';

type PageFavoriteMainProps = {
  favoriteOffers: Offers;
  updatePlaceInfo: (value: Offer) => void;
};

function FavoritesMain({favoriteOffers, updatePlaceInfo}: PageFavoriteMainProps): JSX.Element {
  if (favoriteOffers.length) {
    return (
      <Favorites favoriteOffers={favoriteOffers} updatePlaceInfo={updatePlaceInfo}/>
    );
  }

  return (
    <FavoritesEmpty/>
  );
}

export default FavoritesMain;
