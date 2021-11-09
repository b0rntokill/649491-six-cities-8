import React from 'react';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {State} from '../../types/state';
import {Actions} from '../../types/actions';
import {setActivePlace} from '../../store/action';

type PagePlaceCardProps = {
  offer: Offer;
};

const mapStateToProps = ({activePlace}: State) => ({
  activePlace,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onMouseEnterPlace(id: number | null) {
    dispatch(setActivePlace(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PagePlaceCardProps;

function PlaceCard(props: ConnectedComponentProps): JSX.Element {
  const {offer, activePlace, onMouseEnterPlace} = props;
  const {id, name, images, isPremium, type, price, rating} = offer;
  const mainImage = images[0];

  return (
    <article className="cities__place-card place-card"
      onMouseEnter={() => {
        if (activePlace !== offer.id) {
          onMouseEnterPlace(offer.id);
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

export {PlaceCard};
export default connector(PlaceCard);
