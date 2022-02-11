import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { api } from '../..';
import { ApiRoute, AuthorizationStatus } from '../../const';
import { dropToken, saveToken } from '../../services/token';
import { AuthData } from '../../types/auth-data';
import { UserAuthInfo } from '../../types/users';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';
const LOGOUT_FAIL_MESSAGE = 'Выход не удалася, попробуйте еще раз';
const LOGIN_FAIL_MESSAGE = 'Авторизация не удалась. Проверьте введенные данные';

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async (path: ApiRoute, thunkAPI) => {
    try {
      const {data} = await api.get(path);
      const response = {
        data,
        status: AuthorizationStatus.Auth,
      };
      return response;
    } catch (evt) {
      toast.info(AUTH_FAIL_MESSAGE);
      const response = {
        data: null,
        status: AuthorizationStatus.NoAuth,
      };
      return response;
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async (thunkAPI) => {
    try {
      await api.delete(ApiRoute.Logout);
      dropToken();
      return AuthorizationStatus.NoAuth;
    } catch (evt) {
      toast.error(LOGOUT_FAIL_MESSAGE);
      return AuthorizationStatus.Auth;
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async (authData: AuthData, thunkAPI) => {
    const {login: email, password} = authData;
    try {
      const {data} = await api.post<UserAuthInfo>(ApiRoute.Login, {email, password});
      saveToken(data.token);
      const response = {
        data,
        status: AuthorizationStatus.Auth,
      };
      return response;
    } catch (evt) {
      toast.info(LOGIN_FAIL_MESSAGE);
      const response = {
        data: null,
        status: AuthorizationStatus.NoAuth,
      };
      return response;
    }
  },
);
