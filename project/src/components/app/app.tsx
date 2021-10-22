import React from 'react';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import {useState} from 'react';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../page-main/main';
import Login from '../page-login/login';
import Favorites from '../page-favorites/favorites';
import PlaceInfo from '../page-place-info/place-info';
import Error404 from '../page-404/404';
import PrivateRoute from '../private-route/private-route';
import {Offers, Offer} from '../../types/offer';

type AppProps = {
  offers: Offers;
};

function App({offers}: AppProps): JSX.Element {
  const history = useHistory();
  const [currentPlace, setCurrentPlace] = useState(offers[0]);

  function updatePlaceInfo(value: Offer): void {
    setCurrentPlace(value);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main offers={offers} updatePlaceInfo={updatePlaceInfo}/>
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Place}>
          <PlaceInfo offer={currentPlace}/>
        </Route>
        <Route>
          <Error404/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
