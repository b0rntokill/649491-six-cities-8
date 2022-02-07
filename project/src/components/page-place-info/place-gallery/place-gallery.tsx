import React from 'react';

type PlaceGalleryProps = {
  images: string[];
};

const MAX_IMAGES = 6;

function PlaceGallery({images}: PlaceGalleryProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.slice(0, MAX_IMAGES).map((image: string) => (
          <div className="property__image-wrapper" key={`${image}`}>
            <img className="property__image" src={image} alt="Photo studio"/>
          </div>
        ),
        )}
      </div>
    </div>
  );
}

export default PlaceGallery;
