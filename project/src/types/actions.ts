import {
  setActivePlace,
  setSelectCity,
  getLoadOffers,
  getLoadOffer,
  getLoadNearbyPoints,
  getLoadReviews,
  sendNewReview,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  setUserAuthInfo
} from '../store/action';

export enum ActionType {
  SelectCity = 'main/selectCity',
  ActivePlace = 'place-card/activePlace',
  LoadOffers = 'data/loadOffers',
  LoadOffer = 'data/loadOffer',
  LoadReviews = 'data/loadReviews',
  SendReview = 'comment/sendReview',
  LoadNearbyPoints = 'data/loadNearbyPoints',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'app/redirectToRoute',
  UserAuthInfo = 'login/userAuthInfo',
}

export type Actions =
  | ReturnType<typeof setSelectCity>
  | ReturnType<typeof setActivePlace>
  | ReturnType<typeof getLoadOffers>
  | ReturnType<typeof getLoadOffer>
  | ReturnType<typeof getLoadNearbyPoints>
  | ReturnType<typeof getLoadReviews>
  | ReturnType<typeof sendNewReview>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof setUserAuthInfo>;

