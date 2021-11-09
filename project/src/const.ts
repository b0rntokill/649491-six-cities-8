export const DATE_LOCALES = 'en-US';
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long'};
export const MAX_RATING = 5;
export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';
export const DEFAULT_SELECTED_CITY = 'Paris';
export const DEFAULT_SORT_TYPE = 'Popular';
export const CITY_LIST = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const SORT_LIST = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

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
