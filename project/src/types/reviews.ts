import {User} from "./users";

export type Review = {
  user: User,
  id: number,
  rating: number,
  comment: string,
  date: string,
};

export type Reviews = Review[];

export type NewReview = {
  rating: number,
  comment: string,
};
