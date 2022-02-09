import { type } from 'os';
import { AuthorizationStatus } from '../const';
import { RootState } from '../store/root-reducer';
import { CurrentOffer, Offers } from './offer';
import { Reviews } from './reviews';
import { UserAuthInfo } from './users';

export type SelectedCity = string;
export type ActivePlace = null | number;

export type AppProcess = {
  selectedCity: SelectedCity,
  activePlace: ActivePlace,
};

export type UserProcess = {
  userAuthInfo: UserAuthInfo | null,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};

export type AppData = {
  reviews: Reviews | null,
  offers: Offers,
  currentOffer: CurrentOffer,
  nearbyPoints: Offers | null,
  isDataLoaded: boolean,
};

export type State = RootState;