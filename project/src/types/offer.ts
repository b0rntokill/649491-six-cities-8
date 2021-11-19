import {User} from './users';
import {Reviews} from './reviews';
import {City, Location} from './map';

export type Offer = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: User,
  id: number,
  images: string[],
  isPremium: boolean,
  isFavorite: boolean,
  location: Location,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
};

export type Offers = Offer[];

export type BackendOffer = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: User,
  id: number,
  images: string[],
  is_favorite: boolean,
  is_premium: boolean,
  location: Location,
  max_adults: number,
  preview_image: string,
  price: number,
  rating: number,
  title: string,
  type: string,
};

export type BackendOffers = BackendOffer[];

export type CurrentOffer = {
  isFound: boolean,
  data: Offer | undefined,
};
