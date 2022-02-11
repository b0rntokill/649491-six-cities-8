import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { fetchReviewsAction, sendReviewAction } from '../../store/app-data/async-actions';
import { getReviews } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { ThunkAppDispatch } from '../../types/api-actions';
import { NewComment, NewReview, Reviews } from '../../types/reviews';
import { State } from '../../types/state';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import ReviewsForm from './reviews-form/reviews-form';
import ReviewsList from './reviews-list/reviews-list';

type ReviewsProps = {
  reviewsId: number;
};

const mapStateToProps = (state: State) => ({
  reviews: getReviews(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchReviews(id: number) {
    dispatch(fetchReviewsAction(id));
  },
  async sendReview(id: number, comment: NewComment) {
    const review = {
      id,
      comment,
    };
    await dispatch(sendReviewAction(review as NewReview));
    await dispatch(fetchReviewsAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & ReviewsProps;

function ReviewsTemplate(props: ConnectedComponentProps): JSX.Element {
  const {reviewsId, reviews, authorizationStatus, fetchReviews, sendReview} = props;
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

export { ReviewsTemplate };
export default connector(ReviewsTemplate);
