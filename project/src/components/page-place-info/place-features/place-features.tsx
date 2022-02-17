import React from 'react';

type PlaceFeaturesProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
};

function PlaceFeatures({type, bedrooms, maxAdults}: PlaceFeaturesProps): JSX.Element {
  return (
    <ul className="property__features">
      <li className="property__feature property__feature--entire">{type}</li>
      <li className="property__feature property__feature--bedrooms">{bedrooms} Bedrooms</li>
      <li className="property__feature property__feature--adults">Max {maxAdults} adults</li>
    </ul>
  );
}

export default PlaceFeatures;
