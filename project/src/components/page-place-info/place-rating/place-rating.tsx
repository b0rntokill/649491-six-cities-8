import React from 'react';
import { getRatingToPercent } from '../../../utils';

type PlaceRatingProps = {
  rating: number;
};

function PlaceRating({rating}: PlaceRatingProps): JSX.Element {
  const formatRating = getRatingToPercent(rating);

  return (
    <div className="property__rating rating">
      <div className="property__stars rating__stars">
        <span style={{width: `${formatRating}%`}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      <span className="property__rating-value rating__value">{rating}</span>
    </div>
  );
}

export default PlaceRating;
