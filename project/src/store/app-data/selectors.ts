import { Offer, Offers } from '../../types/offer';
import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getOffers = (state: State): Offers => state[NameSpace.data].offers;
export const getOfferData = (state: State): Offer | undefined => state[NameSpace.data].currentOffer.data;
export const getOfferIsFound = (state: State): boolean => state[NameSpace.data].currentOffer.isFound;
export const getReviews = (state: State): Reviews | null => state[NameSpace.data].reviews;
export const getNearbyPoints = (state: State): Offers | null => state[NameSpace.data].nearbyPoints;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.data].isDataLoaded;
