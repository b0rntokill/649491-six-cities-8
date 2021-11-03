import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useState} from 'react';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../page-main/main';
import Login from '../page-login/login';
import FavoritesMain from '../page-favorites/favorites-main';
import PlaceInfo from '../page-place-info/place-info';
import Header from '../header/header';
import Error404 from '../page-404/404';
import PrivateRoute from '../private-route/private-route';
import {Offers, Offer} from '../../types/offer';
import Footer from '../footer/footer';

type AppProps = {
  offers: Offers;
};

function App({offers}: AppProps): JSX.Element {
  const [currentPlace, setCurrentPlace] = useState<Offer | null>(null);
  const [activePlace, setActivePlace] = useState<number | null>(null);
  const [nearPoints, setNearPoints] = useState<Offers | null>(null);

  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  function searchNearPoint(value: Offer): void {
   const nearPlaces: Offers = offers.filter((offer) => offer.id !== value.id);
   setNearPoints(nearPlaces);
  }

  function updatePlaceInfo(value: Offer): void {
    setCurrentPlace(value);
    searchNearPoint(value);
  }

  function updateActivePlace(value: number | null): void {
    setActivePlace(value);
  }

  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main offers={offers} updatePlaceInfo={updatePlaceInfo} activePlace={activePlace} updateActivePlace={updateActivePlace}/>
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesMain favoriteOffers={favoriteOffers} updatePlaceInfo={updatePlaceInfo}/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Place}>
          {currentPlace &&
            <PlaceInfo
              offer={currentPlace}
              nearPoints={nearPoints}
              updatePlaceInfo={updatePlaceInfo}
              activePlace={activePlace}
              updateActivePlace={updateActivePlace}
            />}
        </Route>
        <Route>
          <Error404/>
        </Route>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
