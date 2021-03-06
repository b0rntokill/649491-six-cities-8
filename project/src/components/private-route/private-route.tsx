import { History } from 'history';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type RenderFuncProps = {
  history: History<unknown>;
}

type PrivateRouteProps = RouteProps & {
  render: (props: RenderFuncProps) => JSX.Element,
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {exact, path, render} = props;
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render(routeProps)
          : <Redirect to={AppRoute.Login} />
      )}
    />
  );
}

export default PrivateRoute;
