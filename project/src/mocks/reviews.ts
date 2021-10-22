import {Reviews} from '../types/reviews';
import {users} from './users';

export const reviews: Reviews = [
  {
    user: users[1],
    id: 11,
    rating: 74,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-08-27',
  },
  {
    user: users[0],
    id: 12,
    rating: 44,
    text: 'The building is green and from 18th century.',
    date: '2021-01-04',
  },
  {
    user: users[2],
    id: 13,
    rating: 98,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2020-03-09',
  },
];
