import {ThunkActionResult, ThunkAppDispatch} from '../types/api-actions';
import {
  getLoadOffers,
  getLoadOffer,
  getLoadNearbyPoints,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  setUserAuthInfo,
  getLoadReviews
} from './action';
import {ApiRoute, AppRoute, AuthorizationStatus} from '../const';
import {BackendOffers, BackendOffer, Offers, CurrentOffer} from '../types/offer';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from '../services/token';
import {getBackendToFrontOffers} from '../utils';
import {toast} from 'react-toastify';
import {UserAuthInfo} from '../types/users';
import {Reviews, NewReview} from '../types/reviews';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';
const LOGIN_FAIL_MESSAGE = 'Авторизация не удалась. Проверьте введенные данные';

export const fetchOffersActions = (): ThunkActionResult =>
  async (dispatch: ThunkAppDispatch, _getState, api) => {
    const {data} = await api.get<BackendOffers>(ApiRoute.Hotels);
    const adapterArr = getBackendToFrontOffers(data);
    dispatch(getLoadOffers(adapterArr as Offers));
  };

export const fetchOfferAction = (id: number): ThunkActionResult =>
  async (dispatch: ThunkAppDispatch, _getState, api) => {
    const offerId = `/${id}`;
    try {
      const {data} = await api.get<BackendOffer>(`${ApiRoute.Hotels}${offerId}`);
      const adapterCurrentOffer = {
        isFound: true,
        data: getBackendToFrontOffers([data])[0],
      };
      dispatch(getLoadOffer(adapterCurrentOffer as CurrentOffer));
    } catch (evt) {
      const adapterCurrentOffer = {
        isFound: false,
        data: undefined,
      };
      dispatch(getLoadOffer(adapterCurrentOffer as CurrentOffer));
      console.info(evt);
    }
  };

export const fetchNearbyPointsAction = (id: number): ThunkActionResult =>
  async (dispatch: ThunkAppDispatch, _getState, api) => {
    const offerId = `/${id}`;
    try {
      const {data} = await api.get<BackendOffers>(`${ApiRoute.Hotels}${offerId}/nearby`);
      const adapterArr = getBackendToFrontOffers(data);
      dispatch(getLoadNearbyPoints(adapterArr as Offers));
    } catch (evt) {
      dispatch(getLoadNearbyPoints(null));
      console.info(evt);
    }
  };

export const fetchReviewsAction = (id: number): ThunkActionResult =>
  async (dispatch: ThunkAppDispatch, _getState, api) => {
    const offerId = `/${id}`;
    try {
      const {data} = await api.get<Reviews>(`${ApiRoute.Reviews}${offerId}`);
      const adapterArr = getBackendToFrontOffers(data);
      dispatch(getLoadReviews(adapterArr as Reviews));
    } catch (evt) {
      console.info(evt);
    }
  };

export const sendReviewAction = (id: number, {comment, rating}: NewReview): ThunkActionResult =>
  async (dispatch: ThunkAppDispatch, _getState, api) => {
    const offerId = `/${id}`;
    try {
      await api.post<NewReview>(`${ApiRoute.Reviews}${offerId}`, {comment, rating});
      const {data} = await api.get<Reviews>(`${ApiRoute.Reviews}${offerId}`);
      const adapterArr = getBackendToFrontOffers(data);
      dispatch(getLoadReviews(adapterArr as Reviews));
    } catch (evt) {
      console.info(evt);
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch: ThunkAppDispatch, _getState, api) => {
    try {
      await api.get(ApiRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (evt) {
      toast.info(AUTH_FAIL_MESSAGE);
      console.info(evt);
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch: ThunkAppDispatch, _getState, api) => {
    try {
      const {data} = await api.post<UserAuthInfo>(ApiRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserAuthInfo(data));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (evt) {
      toast.info(LOGIN_FAIL_MESSAGE);
      console.info(evt);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch: ThunkAppDispatch, _getState, api) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
