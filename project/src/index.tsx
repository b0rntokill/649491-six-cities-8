import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createAPI} from './services/api';
import {redirect} from './store/middlewares/redirect';
import App from './components/app/app';
import { rootReducer } from './store/root-reducer';
import {requireAuthorization} from './store/action';
import {fetchOffersActions, checkAuthAction} from './store/api-actions';
import {ThunkAppDispatch} from './types/api-actions';
import {AuthorizationStatus} from './const';
import { configureStore } from '@reduxjs/toolkit';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersActions());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
