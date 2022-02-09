import { ActivePlace, State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getSelectedCity = (state: State): string => state[NameSpace.app].selectedCity;
export const getActivePlace = (state: State): ActivePlace => state[NameSpace.app].activePlace;
