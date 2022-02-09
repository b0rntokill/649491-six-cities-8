import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router';
import { fetchNearbyPointsAction, fetchOfferAction } from '../../store/api-actions';
import { getCurrentOffer, getIsDataLoaded, getNearbyPoints } from '../../store/app-data/selectors';
import { ThunkAppDispatch } from '../../types/api-actions';
import { Offer, Offers } from '../../types/offer';
import { State } from '../../types/state';
import { getRatingToPercent } from '../../utils';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import Map from '../map/map';
import Error404 from '../page-404/404';
import Places from '../places/places';
import ReviewsTemplate from '../reviews/reviews';
import PlaceConveniences from './place-conveniences/place-conveniences';
import PlaceGallery from './place-gallery/place-gallery';

const mapStateToProps = (state: State) => ({
  currentOffer: getCurrentOffer(state),
  nearbyPoints: getNearbyPoints(state),
  isDataLoaded: getIsDataLoaded(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchOfferInfo(id: number) {
    dispatch(fetchOfferAction(id));
  },
  fetchNearbyPoints(id: number) {
    dispatch(fetchNearbyPointsAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function PlaceInfo(props: PropsFromRedux): JSX.Element {
  const {currentOffer, nearbyPoints, fetchOfferInfo, fetchNearbyPoints} = props;
  const {id} = useParams<{id: string}>();
  const [offer, setOffer] = useState<Offer | undefined>(undefined);
  const [points, setPoints] = useState<Offers | null>(null);

  useEffect(() => {
    fetchOfferInfo(Number(id));
  }, [id]);

  useEffect(() => {
    setOffer(currentOffer.data);
  }, [currentOffer]);

  useEffect(() => {
    fetchNearbyPoints(Number(id));
  }, [id]);

  useEffect(() => {
    setPoints(nearbyPoints);
  }, [nearbyPoints]);

  if (!currentOffer.isFound) {
    return (
      <Error404/>
    );
  }

  if (offer) {
    const {title, images, isPremium, type, price, rating, bedrooms, maxAdults, goods, host, description} = offer;
    const city = offer.city.location;
    const formatRating = getRatingToPercent(rating);

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
                <h1 className="property__name">{title}</h1>
                <button className={`property__bookmark-button button ${isPremium? 'property__bookmark-button--active' : ''}`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${formatRating}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{type}</li>
                <li className="property__feature property__feature--bedrooms">{bedrooms} Bedrooms</li>
                <li className="property__feature property__feature--adults">Max {maxAdults} adults</li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <PlaceConveniences conveniences={goods}/>

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro? 'property__avatar-wrapper--pro' : ''}`}>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">{host.name}</span>

                  {host.isPro &&
                  <span className="property__user-status">
                    {host.isPro}
                  </span>}

                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>

              <ReviewsTemplate reviewsId={Number(id)}/>

            </div>
          </div>

          {points &&
          <section className="property__map map">
            <Map city={city} points={points} height={579}/>
          </section>}

        </section>

        <div className="container">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>

          {points?
            <Places
              offers={points} pageClass={'near-places__list'}
            /> :
            <p className={'text-center font-20'}>Sorry! No near places to stay available</p>}

        </div>
      </main>
    );
  }

  return (
    <main className="page__main page__main--property">
      <LoadingSpinner/>
    </main>
  );

}

export { PlaceInfo };
export default connector(PlaceInfo);
