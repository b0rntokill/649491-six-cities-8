import React from 'react';
import {Router as BrowserRouter, Route, Switch} from 'react-router-dom';
import browserHistory from '../../browser-history';
import {AppRoute} from '../../const';
import Main from '../page-main/main';
import FavoritesMain from '../page-favorites/favorites-main';
import PlaceInfo from '../page-place-info/place-info';
import Header from '../header/header';
import Error404 from '../page-404/404';
import PrivateRoute from '../private-route/private-route';
import Footer from '../footer/footer';
import AuthScreen from '../auth-screen/auth-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Header/>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        <Route exact path={AppRoute.Login}>
          <AuthScreen/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesMain/>}
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
