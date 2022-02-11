import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import { ApiRoute, AuthorizationStatus } from './const';
import { createAPI } from './services/api';
import { fetchOffersAction } from './store/app-data/async-actions';
import { rootReducer } from './store/root-reducer';
import { checkAuthAction } from './store/user-process/async-actions';
import { requireAuthorization } from './store/user-process/user-process';

export const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

(store.dispatch(checkAuthAction(ApiRoute.Login)));
(store.dispatch(fetchOffersAction(ApiRoute.Hotels)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
