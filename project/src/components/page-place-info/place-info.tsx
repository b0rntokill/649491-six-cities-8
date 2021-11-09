import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import PlaceGallery from './place-gallery/place-gallery';
import PlaceConveniences from './place-conveniences/place-conveniences';
import PlaceDescriptions from './place-description/place-description';
import ReviewsTemplate from '../reviews/reviews';
import Map from '../map/map';
import Places from '../places/places';
import {Offer, Offers} from '../../types/offer';
import {Points} from '../../types/map';
import {MAX_RATING} from '../../const';
import Error404 from '../page-404/404';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';

type PagePlaceInfoProps = {
  offers: Offers;
};

const mapStateToProps = ({offers}: State) => ({
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PagePlaceInfoProps;

function PlaceInfo(props: ConnectedComponentProps): JSX.Element {
  const {offers} = props;
  const {id} = useParams<{id: string}>();
  const [offer, setOffer] = useState<Offer | undefined>(undefined);
  const [nearPoints, setNearPoints] = useState<Offers | null>(null);

  useEffect(() => {
    setOffer(offers.find((place) => place.id === Number(id)));

  }, [id]);

  useEffect(() => {
    if (!offer) {
      return;
    }

    const points: Points = [];
    const currentCity = offer.city.name;
    const nearPlaces: Offers = offers.filter((place) => Number(id) !== place.id && currentCity === place.city.name);

    if (nearPlaces) {
      nearPlaces.forEach((place) => points.push({
        id: place.id,
        location: place.location,
      }));
      setNearPoints(nearPlaces);
    }
  }, [offer]);

  if (!offer) {
    return (
      <Error404/>
    );
  }

  const {name, images, isPremium, type, price, rating, bedrooms, capacity, conveniences, owner, descriptions, reviews} = offer;
  const city = offer.city.location;
  const percentToRating = ((Number(rating) * MAX_RATING) / 100).toFixed(1);

  return (
    <main className="page__main page__main--property">
      <section className="property">

        <PlaceGallery images={images}/>

        <div className="property__container container">
          <div className="property__wrapper">

            {isPremium &&
            <div className="property__mark">
              <span>Premium</span>
            </div>}

            <div className="property__name-wrapper">
              <h1 className="property__name">{name}</h1>
              <button className={`property__bookmark-button button ${isPremium? 'property__bookmark-button--active' : ''}`} type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${rating}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{percentToRating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">{type}</li>
              <li className="property__feature property__feature--bedrooms">{bedrooms} Bedrooms</li>
              <li className="property__feature property__feature--adults">Max {capacity} adults</li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>

            <PlaceConveniences conveniences={conveniences}/>

            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={`property__avatar-wrapper user__avatar-wrapper ${owner.status? 'property__avatar-wrapper--pro' : ''}`}>
                  <img className="property__avatar user__avatar" src={owner.avatar} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">{`${owner.name} ${owner.surname ? owner.surname : ''}`}</span>

                {owner.status &&
                <span className="property__user-status">
                  {owner.status}
                </span>}

              </div>

              <PlaceDescriptions descriptions={descriptions}/>

            </div>

            <ReviewsTemplate reviews={reviews}/>

          </div>
        </div>
        {nearPoints &&
        <section className="property__map map">
          <Map city={city} points={nearPoints} height={579}/>
        </section>}
      </section>

      <div className="container">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        {nearPoints?
          <Places
            offers={nearPoints} pageClass={'near-places__list'}
          /> :
          <p className={'text-center font-20'}>Sorry! No near places to stay available</p>}
      </div>
    </main>
  );
}

export {PlaceInfo};
export default connector(PlaceInfo);
