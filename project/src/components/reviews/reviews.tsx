import {Reviews, Review} from '../../types/reviews';
import React from 'react';
import {useState} from 'react';
import ReviewsList from './reviews-list/reviews-list';
import ReviewsForm from './reviews-form/reviews-form';
import {DATE_LOCALES, DATE_OPTIONS} from '../../const';

type ReviewsProps = {
  reviews: Reviews;
};

function ReviewsTemplate({reviews}: ReviewsProps): JSX.Element {
  const [reviewsArr, setReviewsArr] = useState(reviews);

  function addReview(text: string, rating: number): void {
    const formatText = text.trim();
    const newReview: Review = {
      user: {
        id: Date.now(),
        name: 'Anonymous',
        avatar: 'img/avatar.svg',
        status: '',
      },
      id: Date.now(),
      rating: rating,
      text: formatText,
      date: new Date().toLocaleString(DATE_LOCALES, DATE_OPTIONS),
    };

    setReviewsArr((prevState: Reviews) => ([...prevState, newReview]));
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsArr.length}</span></h2>

      {reviewsArr.map((review: Review) =>
        <ReviewsList review={review} key={review.id}/>)}

      <ReviewsForm addReview={addReview}/>

    </section>
  );
}

export default ReviewsTemplate;
