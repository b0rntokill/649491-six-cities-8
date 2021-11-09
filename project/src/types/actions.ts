import {setActivePlace, setSelectCity} from '../store/action';

export enum ActionType {
  SelectCity = 'main/selectCity',
  ActivePlace = 'place-card/activePlace',
}

export type Actions =
  | ReturnType<typeof setSelectCity>
  | ReturnType<typeof setActivePlace>;
