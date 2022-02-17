export const DATE_LOCALES = 'en-US';
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long'};
export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';
export const MIN_CHARACTERS_REVIEW = 50;
export const RATING_ARR = [5, 4, 3, 2, 1];
export const MIN_RATING_REVIEW = 1;
export const RATING_TO_PERCENT = 20;

export enum AppRoute {
  Login = '/login',
  Main = '/',
  Favorites = '/favorites',
  Place = '/offer/:id',
}

export enum ApiRoute {
  Hotels = '/hotels',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortList {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const DEFAULT_SORT_TYPE = SortList.Popular;

export enum CityList {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const DEFAULT_SELECTED_CITY = CityList.Paris;
