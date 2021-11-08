import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../page-main/main';
import Login from '../page-login/login';
import FavoritesMain from '../page-favorites/favorites-main';
import PlaceInfo from '../page-place-info/place-info';
import Header from '../header/header';
import Error404 from '../page-404/404';
import PrivateRoute from '../private-route/private-route';
import Footer from '../footer/footer';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesMain/>}
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
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
