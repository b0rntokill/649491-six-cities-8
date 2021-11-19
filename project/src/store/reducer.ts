import {State} from '../types/state';
import {Actions, ActionType} from '../types/actions';
import {DEFAULT_SELECTED_CITY, AuthorizationStatus} from '../const';

const initialState = {
  selectedCity: DEFAULT_SELECTED_CITY,
  offers: [],
  currentOffer: {
    isFound: true,
    data: undefined,
  },
  nearbyPoints: null,
  reviews: null,
  userAuthInfo: null,
  activePlace: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, selectedCity: action.payload};
    case ActionType.ActivePlace:
      return {...state, activePlace: action.payload};
    case ActionType.LoadOffers:
      return {
        ...state,
        offers: action.payload.offers,
        isDataLoaded: action.payload.isDataLoaded,
      };
    case ActionType.LoadOffer:
      return {
        ...state,
        currentOffer: action.payload,
      };
    case ActionType.LoadNearbyPoints:
      return {
        ...state,
        nearbyPoints: action.payload,
      };
    case ActionType.LoadReviews:
      return {
        ...state,
        reviews: action.payload,
      };
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload.authStatus,
        isDataLoaded: action.payload.isDataLoaded,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.UserAuthInfo:
      return {...state, userAuthInfo: action.payload};
    default:
      return state;
  }
};

export {reducer};
