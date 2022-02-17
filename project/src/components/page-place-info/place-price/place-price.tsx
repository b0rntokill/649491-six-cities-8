import React from 'react';

type PlacePriceProps = {
  price: number;
};

function PlacePrice({price}: PlacePriceProps): JSX.Element {
  return (
    <div className="property__price">
      <b className="property__price-value">&euro;{price}</b>
      <span className="property__price-text">&nbsp;night</span>
    </div>
  );
}

export default PlacePrice;
