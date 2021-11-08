import {State} from '../types/state';
import {Actions, ActionType} from '../types/actions';
import {offers} from '../mocks/offers';
import {DEFAULT_SELECTED_CITY} from '../const';

const initialState = {
  selectedCity: DEFAULT_SELECTED_CITY,
  offers: offers,
  activePlace: null,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, selectedCity: action.payload};
    case ActionType.ActivePlace:
      return {...state, activePlace: action.payload};
    default:
      return state;
  }
};

export {reducer};
