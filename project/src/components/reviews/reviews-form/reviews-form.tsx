import React from 'react';
import {useState, FormEvent, ChangeEvent} from 'react';

type ReviewsListProps = {
  addReview: (text: string, rating: number) => void;
};

function ReviewsForm({addReview}: ReviewsListProps): JSX.Element {
  const MIN_CHARACTERS_REVIEW = 50;
  const MIN_RATING_REVIEW = 1;
  const RATING_TO_PERCENT = 20;
  const REPLACE_WHITESPACE = /\s+/g;

  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [submitStatus, setSubmitStatus] = useState(false);

  function onTextChange(evt: ChangeEvent<HTMLTextAreaElement>): void {
    const value = (evt.target.value).replace(REPLACE_WHITESPACE, ' ');
    setText(value);
    checkFormForSubmit();
  }

  function onRatingChange(evt: ChangeEvent<HTMLInputElement>): void {
    const value = Number(evt.target.value) * RATING_TO_PERCENT;
    setRating(value);
    checkFormForSubmit();
  }

  function checkFormForSubmit(): void {
    const charactersCount = (text.trim().replace(/\s+/g, '')).length;

    if (charactersCount >= MIN_CHARACTERS_REVIEW && rating >= MIN_RATING_REVIEW) {
      setSubmitStatus(true);
      return;
    }
    setSubmitStatus(false);
  }

  function onFormSubmit(evt: FormEvent): void {
    evt.preventDefault();
    addReview(text, rating);
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
               onChange={onRatingChange}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
               onChange={onRatingChange}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
               onChange={onRatingChange}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
               onChange={onRatingChange}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
               onChange={onRatingChange}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea"
                id="review"
                name="review"
                placeholder="Tell how was your stay, what you like and what can be improved"
                value={text}
                onChange={onTextChange}
      ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit"
                disabled={!submitStatus}>Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
