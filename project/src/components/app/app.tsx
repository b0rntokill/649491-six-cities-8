import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../page-main/main';
import Login from '../page-login/login';
import Favorites from '../page-favorites/favorites';
import PlaceInfo from '../page-place-info/place-info';
import Error404 from '../page-404/404';
import PrivateRoute from '../private-route/private-route';


type AppProps = {
  cardCount: number;
};

function App({cardCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main cardCount={cardCount}/>
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
          <PlaceInfo/>
        </Route>
        <Route>
          <Error404/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
