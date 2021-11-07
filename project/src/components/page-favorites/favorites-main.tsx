import React from 'react';
import Favorites from './favorites/favorites';
import FavoritesEmpty from './favorites/favorites-empty';
import {Offers} from '../../types/offer';

type PageFavoriteMainProps = {
  favoriteOffers: Offers;
};

function FavoritesMain({favoriteOffers}: PageFavoriteMainProps): JSX.Element {
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
