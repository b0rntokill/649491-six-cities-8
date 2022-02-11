import {combineReducers} from 'redux';
import { appData } from './app-data/app-data';
import { appProcess } from './app-process/app-process';
import { userProcess } from './user-process/user-process';

export enum NameSpace {
  user = 'USER',
  data = 'DATA',
  app = 'APP'
}

export const rootReducer = combineReducers({
  [NameSpace.user]: userProcess,
  [NameSpace.app]: appProcess,
  [NameSpace.data]: appData,
});

export type RootState = ReturnType<typeof rootReducer>;
