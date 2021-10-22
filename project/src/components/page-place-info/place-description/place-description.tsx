import React from 'react';

type PlaceDescriptionsProps = {
  descriptions: string[];
};

function PlaceDescriptions({descriptions}: PlaceDescriptionsProps): JSX.Element {
  return (
    <div className="property__description">
      {descriptions.map((description: string, index) =>
        <p className="property__text" key={index}>{description}</p>
      )}
    </div>
  );
}

export default PlaceDescriptions;
