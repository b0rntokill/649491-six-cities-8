import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { ActionType } from '../types/actions';
import { CurrentOffer, Offers } from '../types/offer';
import { NewReview, Reviews } from '../types/reviews';
import { ActivePlace, SelectedCity } from '../types/state';
import { UserAuthInfo } from '../types/users';

export const setSelectCity = createAction<SelectedCity>(ActionType.SelectCity);

export const setActivePlace = createAction<ActivePlace>(ActionType.ActivePlace);

export const getLoadOffers = createAction(
  ActionType.LoadOffers,
  (offers: Offers) => ({
    payload: {
      offers,
      isDataLoaded: true,
    },
  }),
);

export const getLoadOffer = createAction<CurrentOffer>(ActionType.LoadOffer);

export const getLoadNearbyPoints = createAction<Offers | null>(ActionType.LoadNearbyPoints);

export const getLoadReviews = createAction<Reviews>(ActionType.LoadReviews);

export const setNewReview = createAction<NewReview>(ActionType.NewReview);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: {
      authStatus: authStatus,
      isDataLoaded: true,
    },
  }),
);

export const requireLogout = createAction(
  ActionType.RequireLogout,
  (authStatus: AuthorizationStatus) => ({
    payload: {
      authStatus: authStatus,
    },
  }),
);

export const redirectToRoute = createAction<AppRoute>(ActionType.RedirectToRoute);

export const setUserAuthInfo = createAction<UserAuthInfo>(ActionType.UserAuthInfo);
