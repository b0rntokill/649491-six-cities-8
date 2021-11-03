import React from 'react';

type PlaceConveniencesProps = {
  conveniences: string[];
};

function PlaceConveniences({conveniences}: PlaceConveniencesProps): JSX.Element {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {conveniences.map((convenience: string) =>
          <li className="property__inside-item" key={`${convenience}`}>{convenience}</li>)}
      </ul>
    </div>
  );
}

export default PlaceConveniences;
