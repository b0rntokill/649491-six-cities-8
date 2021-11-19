import {ActionType} from '../types/actions';
import {Offers, CurrentOffer} from '../types/offer';
import {UserAuthInfo} from '../types/users';
import {AppRoute, AuthorizationStatus} from '../const';
import {Reviews, NewReview} from '../types/reviews';

export const setSelectCity = (city: string) => ({
  type: ActionType.SelectCity,
  payload: city,
} as const);

export const setActivePlace = (id: number | null) => ({
  type: ActionType.ActivePlace,
  payload: id,
} as const);

export const getLoadOffers = (offers: Offers) => ({
  type: ActionType.LoadOffers,
  payload: {
    offers,
    isDataLoaded: true,
  },
} as const);

export const getLoadOffer = (offer: CurrentOffer) => ({
  type: ActionType.LoadOffer,
  payload: offer,
} as const);

export const getLoadNearbyPoints = (offers: Offers | null) => ({
  type: ActionType.LoadNearbyPoints,
  payload: offers,
} as const);

export const getLoadReviews = (reviews: Reviews) => ({
  type: ActionType.LoadReviews,
  payload: reviews,
} as const);

export const sendNewReview = (review: NewReview) => ({
  type: ActionType.SendReview,
  payload: review,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: {
    authStatus: authStatus,
    isDataLoaded: true,
  },
} as const);

export const requireLogout  = () => ({
  type: ActionType.RequireLogout,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

export const setUserAuthInfo = (userAuthInfo: UserAuthInfo) => ({
  type: ActionType.UserAuthInfo,
  payload: userAuthInfo,
} as const);
