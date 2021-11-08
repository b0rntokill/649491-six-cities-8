export enum ActionType {
  SelectCity = 'main/selectCity',
  ActivePlace = 'place-card/activePlace',
}

export type SelectCityActions = {
  type: ActionType.SelectCity,
  payload: string,
};

export type ActivePlaceActions = {
  type: ActionType.ActivePlace,
  payload: number | null,
};

export type Actions =
  SelectCityActions
  | ActivePlaceActions;
