import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createAPI} from './services/api';
import {composeWithDevTools} from 'redux-devtools-extension';
import {redirect} from './store/middlewares/redirect';
import App from './components/app/app';
import {reducer} from './store/reducer';
import {requireAuthorization} from './store/action';
import {fetchOffersActions, checkAuthAction} from './store/api-actions';
import {ThunkAppDispatch} from './types/api-actions';
import {AuthorizationStatus} from './const';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

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
