import React from 'react';

type PlaceTitleProps = {
  title: string;
  isPremium: boolean;
};

function PlaceTitle({title, isPremium}: PlaceTitleProps): JSX.Element {
  return (
    <div className="property__name-wrapper">
      <h1 className="property__name">{title}</h1>
      <button className={`property__bookmark-button button ${isPremium? 'property__bookmark-button--active' : ''}`} type="button">
        <svg className="property__bookmark-icon" width="31" height="33">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">To bookmarks</span>
      </button>
    </div>
  );
}

export default PlaceTitle;
