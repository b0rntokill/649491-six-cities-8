import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Favorites from './favorites/favorites';
import FavoritesEmpty from './favorites/favorites-empty';
import {Offer} from '../../types/offer';
import {State} from '../../types/state';

const mapStateToProps = ({offers}: State) => ({
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FavoritesMain(props: PropsFromRedux): JSX.Element {
  const {offers} = props;
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

export {FavoritesMain};
export default connector(FavoritesMain);
