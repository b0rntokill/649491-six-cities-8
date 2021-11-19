import React from 'react';
import {Review, Reviews} from '../../../types/reviews';
import ReviewItem from './review-item/rewiew-item';

type ReviewsListProps = {
  reviewsArr: Reviews | null;
};

function ReviewsList({reviewsArr}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviewsArr && reviewsArr.map((review: Review) =>
        <ReviewItem review={review} key={review.id}/>)}
    </ul>
  );
}

export default ReviewsList;
