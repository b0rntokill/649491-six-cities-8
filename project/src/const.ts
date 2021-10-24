export const DATE_LOCALES = 'en-US';
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long'};

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
