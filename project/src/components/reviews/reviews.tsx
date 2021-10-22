import {Reviews, Review} from '../../types/reviews';
import React from 'react';
import {useState} from 'react';
import ReviewsList from './reviews-list/reviews-list';
import ReviewsForm from './reviews-form/reviews-form';

type ReviewsProps = {
  reviews: Reviews;
};

function ReviewsTemplate({reviews}: ReviewsProps): JSX.Element {
  const [reviewsArr, setReviewsArr] = useState(reviews);
  const reviewsCount = reviews.length;

  function addReview(review: Review): void {
    setReviewsArr((prevState: Reviews) => ([...prevState, review]));
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>

      {reviewsArr.map((review: Review) =>
        <ReviewsList review={review} key={review.id}/>)
      }

    <ReviewsForm addReview={addReview}/>

    </section>
  );
}

export default ReviewsTemplate;
