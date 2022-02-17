import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { fetchReviewsAction, sendReviewAction } from '../../store/app-data/async-actions';
import { getReviews } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { NewReview } from '../../types/reviews';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import ReviewsForm from './reviews-form/reviews-form';
import ReviewsList from './reviews-list/reviews-list';

type ReviewsProps = {
  id: number;
};

function ReviewsTemplate({id}: ReviewsProps): JSX.Element {
  const reviews = useSelector(getReviews);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isAuthUser = (authorizationStatus === AuthorizationStatus.Auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviewsAction(id));
  }, [id]);

  const onSubmitReview = async (text: string, rating: number) => {
    const formatText = text.trim();

    const review: NewReview = {
      id: id,
      comment: {
        comment: formatText,
        rating: rating,
      },
    };

    await dispatch(sendReviewAction(review));
    await dispatch(fetchReviewsAction(id));
  }

  if (!reviews) {
    return (
      <LoadingSpinner />
    );
  }

  const isReviewHide = (reviews.length === 0 && isAuthUser);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>

      {!isReviewHide &&
      <p className={'text-center'}>Your comment will be the first</p>}

      <ReviewsList reviewsArr={reviews}/>

      {isAuthUser &&
      <ReviewsForm onSubmitReview={onSubmitReview}/>}
    </section>
  );
}

export default ReviewsTemplate;
