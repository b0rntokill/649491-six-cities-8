import React from 'react';
import {Review, Reviews} from '../../../types/reviews';
import ReviewItem from './review-item/rewiew-item';

type ReviewsListProps = {
  reviews: Reviews;
};

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review: Review) =>
        <ReviewItem review={review} key={review.id}/>)}
    </ul>
  );
}

export default ReviewsList;
