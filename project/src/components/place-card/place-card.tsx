import React from 'react';
import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';

type PagePlaceCardProps = {
  offer: Offer;
  updateActivePlace: (value: number | null) => void;
  activePlace: number | null;
};

function PlaceCard({offer, updateActivePlace, activePlace}: PagePlaceCardProps): JSX.Element {
  const {id, name, images, isPremium, type, price, rating} = offer;
  const mainImage = images[0];

  console.log(activePlace);

  return (
    <article className="cities__place-card place-card"
      onMouseEnter={() => {
        if (activePlace !== offer.id) {
          updateActivePlace(offer.id);
        }
      }}
    >

      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link
          to={`/offer/${id}`}
        >
          <img className="place-card__image" src={mainImage} width="260" height="200" alt={name}/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button  button ${isPremium? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`/offer/${id}`}
          >
            {name}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
