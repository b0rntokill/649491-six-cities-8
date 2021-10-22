import {User} from "./users";

export type Review = {
  user: User,
  id: number,
  rating: number,
  text: string,
  date: string,
};

export type Reviews = Review[];
