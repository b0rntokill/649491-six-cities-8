import React, { ChangeEvent, FormEvent, useState } from 'react';
import { MIN_CHARACTERS_REVIEW, MIN_RATING_REVIEW } from '../../../const';
import RatingList from './rating-list';

type ReviewsListProps = {
  onSubmitReview: (text: string, rating: number) => void;
};

const REPLACE_WHITESPACE = /\s+/g;

function ReviewsForm({onSubmitReview}: ReviewsListProps): JSX.Element {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const isSubmitStatus = text.length >= MIN_CHARACTERS_REVIEW && rating >= MIN_RATING_REVIEW;

  const onTextChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = (evt.target.value).replace(REPLACE_WHITESPACE, ' ');
    setText(value);
  }

  const onRatingChange = (rating: number): void => {
    setRating(rating);
  }

  const onFormSubmit = (evt: FormEvent): void => {
    evt.preventDefault();
    onSubmitReview(text, rating);
    setText('');
    setRating(0);
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <RatingList curRating={rating} onRatingChange={onRatingChange}/>

      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={text}
        onChange={onTextChange}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit"
          disabled={!isSubmitStatus}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
