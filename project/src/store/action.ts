import {
  ActionType,
  SelectCityActions,
  ActivePlaceActions
} from '../types/actions';

export const selectCity = (city: string): SelectCityActions => ({
  type: ActionType.SelectCity,
  payload: city,
});

export const activePlace = (id: number | null): ActivePlaceActions => ({
  type: ActionType.ActivePlace,
  payload: id,
});
