import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchNearbyOffersAction, fetchOfferAction } from '../../store/app-data/async-actions';
import { getNearbyPoints, getOfferData, getOfferIsFound } from '../../store/app-data/selectors';
import { Offer } from '../../types/offer';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import Map from '../map/map';
import Error404 from '../page-404/404';
import Places from '../places/places';
import ReviewsTemplate from '../reviews/reviews';
import HostInfo from './host-info/host-info';
import PlaceConveniences from './place-conveniences/place-conveniences';
import PlaceFeatures from './place-features/place-features';
import PlaceGallery from './place-gallery/place-gallery';
import PlacePrice from './place-price/place-price';
import PlaceRating from './place-rating/place-rating';
import PlaceTitle from './place-title/place-title';

function PlaceInfo(): JSX.Element {
  const {id} = useParams<{id: string}>();
  const currentOffer = useSelector(getOfferData);
  const offerIsFound = useSelector(getOfferIsFound);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOfferAction(Number(id)));
    dispatch(fetchNearbyOffersAction(Number(id)));
  }, [id]);

  if (!offerIsFound) {
    return (
      <Error404/>
    );
  }

  return (
    <main className="page__main page__main--property">
      <PlaceInfoContent offer={currentOffer}/>
    </main>
  );
}

function PlaceInfoContent({offer}: {offer?: Offer}): JSX.Element {
  const nearbyPoints = useSelector(getNearbyPoints);

  if (!offer) {
    return (
      <LoadingSpinner/>
    );
  }

  const {id, title, images, isPremium, type, price, rating, bedrooms, maxAdults, goods, host, description} = offer;
  const city = offer.city.location;

  // TODO кандидат для второй фазы
  return (
    <>
      <section className="property">
        <PlaceGallery images={images}/>
        <div className="property__container container">
          <div className="property__wrapper">

            {isPremium &&
            <div className="property__mark">
              <span>Premium</span>
            </div>}

            <PlaceTitle title={title} isPremium={isPremium}/>
            <PlaceRating rating={rating}/>
            <PlaceFeatures type={type} bedrooms={bedrooms} maxAdults={maxAdults}/>
            <PlacePrice price={price}/>
            <PlaceConveniences conveniences={goods}/>
            <HostInfo host={host} description={description}/>
            <ReviewsTemplate id={id}/>
          </div>
        </div>

        {nearbyPoints &&
        <section className="property__map map">
          <Map city={city} points={nearbyPoints} height={579}/>
        </section>}
      </section>

      <div className="container">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        {nearbyPoints?
          <Places
            offers={nearbyPoints} pageClass={'near-places__list'}
          /> :
          <p className={'text-center font-20'}>Sorry! No near places to stay available</p>}
      </div>
    </>
  );
}

export default PlaceInfo;
