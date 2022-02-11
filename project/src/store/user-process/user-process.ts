import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from './async-actions';

const initialState: UserProcess = {
  userAuthInfo: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const userProcessSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
      state.isDataLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.userAuthInfo = action.payload.data;
        state.authorizationStatus = action.payload.status;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        if (action.payload === AuthorizationStatus.NoAuth) {
          state.userAuthInfo = null;
          state.authorizationStatus = action.payload;
        }
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userAuthInfo = action.payload.data;
        state.authorizationStatus = action.payload.status;
      });
  },
});

const {actions, reducer} = userProcessSlice;

export const {
  requireAuthorization,
} = actions;

export const userProcess = reducer;
