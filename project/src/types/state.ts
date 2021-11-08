import {Offers} from './offer';

export type State = {
  selectedCity: string,
  offers: Offers,
  activePlace: null | number;
};
