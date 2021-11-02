export const DATE_LOCALES = 'en-US';
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long'};
export const MAX_RATING = 5;
export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export enum AppRoute {
  Login = '/login',
  Main = '/',
  Favorites = '/favorites',
  Place = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
