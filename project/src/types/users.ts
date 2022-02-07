import {Token} from '../services/token';

export type User = {
  id: number,
  name: string,
  avatarUrl: string,
  isPro: boolean,
};

export type Users = User[];

export type UserAuthInfo = {
  avatar_url: string,
  email: string,
  id: number,
  is_pro: false,
  name: string,
  token: Token,
};
