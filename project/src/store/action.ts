import {ActionType} from '../types/actions';

export const setSelectCity = (city: string) => ({
  type: ActionType.SelectCity,
  payload: city,
} as const);

export const setActivePlace = (id: number | null) => ({
  type: ActionType.ActivePlace,
  payload: id,
} as const);
