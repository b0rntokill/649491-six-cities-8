import {Offers, CurrentOffer} from './offer';
import {UserAuthInfo} from './users';
import {AuthorizationStatus} from '../const';
import {Reviews} from './reviews';

export type State = {
  selectedCity: string,
  offers: Offers,
  currentOffer: CurrentOffer,
  nearbyPoints: Offers | null,
  reviews: Reviews | null,
  userAuthInfo: UserAuthInfo | null,
  activePlace: null | number,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};
