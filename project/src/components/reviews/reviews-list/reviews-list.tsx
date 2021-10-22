import {Review} from '../../../types/reviews';
import React from 'react';

type ReviewsListProps = {
  review: Review;
};

function ReviewsList({review}: ReviewsListProps): JSX.Element {
  const {user, rating, text, date} = review;

  return (
      <ul className="reviews__list">
        <li className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img className="reviews__avatar user__avatar" src={user.avatar} width="54" height="54" alt="Reviews avatar"/>
            </div>
            <span className="reviews__user-name">{`${user.name} ${user.surname ? user.surname : ''}`}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{width: `${rating}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">{text}</p>
            <time className="reviews__time" dateTime={date}>{
              new Date(date).toLocaleString('en-US', {year: 'numeric', month: 'long'})
            }</time>
          </div>
        </li>
      </ul>
  );
}

export default ReviewsList;
