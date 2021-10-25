import React from 'react';

type PlaceDescriptionsProps = {
  descriptions: string[];
};

function PlaceDescriptions({descriptions}: PlaceDescriptionsProps): JSX.Element {
  return (
    <div className="property__description">
      {descriptions.map((description: string) =>
        <p className="property__text" key={Date.now()}>{description}</p>)}
    </div>
  );
}

export default PlaceDescriptions;
