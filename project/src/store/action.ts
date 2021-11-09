import {
  ActionType,
  SelectCityActions,
  ActivePlaceActions
} from '../types/actions';

export const setSelectCity = (city: string): SelectCityActions => ({
  type: ActionType.SelectCity,
  payload: city,
});

export const setActivePlace = (id: number | null): ActivePlaceActions => ({
  type: ActionType.ActivePlace,
  payload: id,
});
