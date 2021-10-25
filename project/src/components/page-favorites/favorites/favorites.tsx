import React from 'react';
import FavoriteList from '../favorite-list/favorite-list';
import {Offers, Offer} from '../../../types/offer';

type PageFavoriteProps = {
  favoriteOffers: Offers;
  updatePlaceInfo: (value: Offer) => void;
};

function Favorites({favoriteOffers, updatePlaceInfo}: PageFavoriteProps): JSX.Element {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <FavoriteList offers={favoriteOffers} updatePlaceInfo={updatePlaceInfo}/>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Favorites;
