import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Places from '../places/places';
import PlacesEmpty from '../places/places-empty';
import Locations from './locations/locations';
import Map from '../map/map';
import {Offer, Offers} from '../../types/offer';
import {Points, Location} from '../../types/map';
import {State} from '../../types/state';

type PageMainProps = {
  offers: Offers;
};

const mapStateToProps = ({selectedCity, offers}: State) => ({
  offers,
  selectedCity,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PageMainProps;

function Main(props: ConnectedComponentProps): JSX.Element {
  const {selectedCity, offers} = props;
  const EMPTY_OFFERS_CLASS = 'page__main--index-empty';
  const selectedOffers = offers.filter((offer: Offer) => offer.city.name === selectedCity);

  let city: Location | null = null;
  const points: Points = [];

  if (selectedOffers.length) {
    city = selectedOffers[0].city.location;

    selectedOffers.forEach((offer) => points.push({
      id: offer.id,
      location: offer.location,
    }));
  }

  return (
    <main className={`page__main page__main--index ${selectedOffers? EMPTY_OFFERS_CLASS : ''}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations/>
      </div>
      <div className="cities">
        <div className="cities__places-container container">

          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{selectedOffers.length} places to stay in {selectedCity}</b>

            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>

            {selectedOffers.length?
              <Places
                offers={selectedOffers} pageClass={'cities__places-list'}
              />
              : <PlacesEmpty/>}
          </section>
          <div className="cities__right-section">
            {city?
              <Map city={city} points={points} height={873}/> : null}
          </div>
        </div>
      </div>
    </main>
  );
}

export {Main};
export default connector(Main);
