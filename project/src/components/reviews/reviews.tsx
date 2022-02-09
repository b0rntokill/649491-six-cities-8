import {Reviews, NewReview} from '../../types/reviews';
import React, {useEffect} from 'react';
import {useState} from 'react';
import ReviewsList from './reviews-list/reviews-list';
import ReviewsForm from './reviews-form/reviews-form';
import {State} from '../../types/state';
import {ThunkAppDispatch} from '../../types/api-actions';
import {fetchReviewsAction, sendReviewAction} from '../../store/api-actions';
import {connect, ConnectedProps} from 'react-redux';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import {AuthorizationStatus} from '../../const';
import { getReviews } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

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
  sendReview(id: number, comment: NewReview) {
    dispatch(sendReviewAction(id, comment));
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

export {ReviewsTemplate};
export default connector(ReviewsTemplate);
