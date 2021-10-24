import {User} from "./users";
import {Reviews} from "./reviews";

export type Offer = {
  id: number,
  name: string,
  isPremium: boolean,
  isFavorite: boolean,
  images: string[],
  rating: string,
  type: string,
  bedrooms: number,
  capacity: number,
  price: number,
  conveniences: string[],
  descriptions: string[],
  owner: User,
  reviews: Reviews,
};

export type Offers = Offer[];
