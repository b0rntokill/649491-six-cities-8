import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { fetchReviewsAction, sendReviewAction } from '../../store/app-data/async-actions';
import { getReviews } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { NewComment, NewReview, Reviews } from '../../types/reviews';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import ReviewsForm from './reviews-form/reviews-form';
import ReviewsList from './reviews-list/reviews-list';

type ReviewsProps = {
  reviewsId: number;
};

function ReviewsTemplate(props: ReviewsProps): JSX.Element {
  const {reviewsId} = props;
  const reviews = useSelector(getReviews);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();
  const fetchReviews = (id: number): void => {
    dispatch(fetchReviewsAction(id));
  };

  const sendReview = async (id: number, comment: NewComment) => {
    const review = {
      id,
      comment,
    };
    await dispatch(sendReviewAction(review as NewReview));
    await dispatch(fetchReviewsAction(id));
  };

  const [reviewsArr, setReviewsArr] = useState<Reviews | null>(null);
  const isAuthUser = (authorizationStatus === AuthorizationStatus.Auth);

  useEffect(() => {
    fetchReviews(reviewsId);
  }, [reviewsId]);

  useEffect(() => {
    setReviewsArr(reviews);
  }, [reviews]);

  function addReview(text: string, rating: number): void {
    const formatText = text.trim();
    const newReview = {
      comment: formatText,
      rating: rating,
    };

    sendReview(reviewsId, newReview);
  }

  if (reviewsArr) {
    return (
      <section className="property__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsArr.length}</span></h2>

        {reviewsArr.length === 0 && isAuthUser &&
        <p className={'text-center'}>Your comment will be the first</p>}

        <ReviewsList reviewsArr={reviewsArr}/>

        {isAuthUser &&
          <ReviewsForm addReview={addReview}/>}

      </section>
    );
  }

  return (
    <LoadingSpinner />
  );

}

export default ReviewsTemplate;
