import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';

import {
  AxiosInstance
} from 'axios';

import {State} from '../types/state';
import {Actions} from './actions';

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
