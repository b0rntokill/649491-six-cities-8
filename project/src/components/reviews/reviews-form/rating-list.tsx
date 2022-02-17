import React from 'react';
import { RATING_ARR } from '../../../const';

type RatingListProps = {
  curRating: number;
  onRatingChange: (rating: number) => void;
};

function RatingList({curRating, onRatingChange}: RatingListProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">
      {RATING_ARR.map((rating) => (
        <React.Fragment key={rating}>
          <input className="form__rating-input visually-hidden" name="rating" value={rating} id={`${rating}-stars`} type="radio"
            onChange={() => onRatingChange(rating)}
            checked={rating === curRating}
          />
          <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </React.Fragment>
      ),
      )}
    </div>
  );
}

export default RatingList;
