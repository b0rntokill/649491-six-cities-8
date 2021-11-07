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
  const [activePlace, setActivePlace] = useState<number | null>(null);

  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  function updateActivePlace(value: number | null): void {
    setActivePlace(value);
  }

  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main offers={offers} activePlace={activePlace} updateActivePlace={updateActivePlace}/>
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesMain favoriteOffers={favoriteOffers}/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Place}>
          <PlaceInfo
            offers={offers}
            activePlace={activePlace}
            updateActivePlace={updateActivePlace}
          />
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
