import React from 'react';

type PlaceGalleryProps = {
  images: string[];
};

function PlaceGallery({images}: PlaceGalleryProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map((image: string, key) =>
          <div className="property__image-wrapper" key={`${image}${key}`}> <img className="property__image" src={image} alt="Photo studio"/></div>)}
      </div>
    </div>
  );
}

export default PlaceGallery;
