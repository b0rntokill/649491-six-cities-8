import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { requireAuthorization, requireLogout, setUserAuthInfo } from '../action';

const initialState: UserProcess = {
  userAuthInfo: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};


const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      const {authStatus, isDataLoaded} = action.payload;
      state.authorizationStatus = authStatus;
      state.isDataLoaded = isDataLoaded;
    })
    .addCase(requireLogout, (state, action) => {
      const {authStatus} = action.payload;
      state.authorizationStatus = authStatus;
    })
    .addCase(setUserAuthInfo, (state, action) => {
      state.userAuthInfo = action.payload;
    });
});

export { userProcess };

