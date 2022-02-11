import {User} from "./users";

export type Review = {
  user: User,
  id: number,
  rating: number,
  comment: string,
  date: string,
};

export type Reviews = Review[];

export type NewComment = {
  rating: number,
  comment: string,
};

export type NewReview = {
  id: number,
  comment: NewComment,
};
