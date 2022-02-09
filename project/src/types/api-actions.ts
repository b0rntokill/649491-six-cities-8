import { Action } from '@reduxjs/toolkit';

import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';

import {
  AxiosInstance
} from 'axios';

import {State} from '../types/state';

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
