import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { api } from '../..';
import { ApiRoute } from '../../const';
import { BackendOffer, BackendOffers, CurrentOffer, Offers } from '../../types/offer';
import { NewComment, NewReview, Reviews } from '../../types/reviews';
import { getBackendToFrontOffers } from '../../utils';

const OFFERS_FETCH_FAIL_MESSAGE = 'Получение вариантов размещения закончилось с ошибкой. Обновите страницу';
const OFFER_FETCH_FAIL_MESSAGE = 'Получение информации о размещении закончилось с ошибкой. Обновите страницу';
const NEARBY_FETCH_FAIL_MESSAGE = 'Получение ближайших размещений закончилось с ошибкой. Обновите страницу';
const REVIEW_FETCH_FAIL_MESSAGE = 'Получение комментариев закончилось с ошибкой. Обновите страницу';
const REVIEW_SEND_FAIL_MESSAGE = 'Отправка комментария закончилась с ошибкой. Попробуйте еще раз';

export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async (path: ApiRoute, thunkAPI) => {
    try {
      const {data} = await api.get<BackendOffers>(path);
      const adapterOffers = getBackendToFrontOffers(data);
      return adapterOffers as Offers;
    } catch {
      toast.error(OFFERS_FETCH_FAIL_MESSAGE);
      return [];
    }
  },
);

export const fetchOfferAction = createAsyncThunk(
  'data/fetchOffer',
  async (offerId: number, thunkAPI) => {
    try {
      const {data} = await api.get<BackendOffer>(`${ApiRoute.Hotels}/${offerId}`);
      const adapterOffer = {
        isFound: true,
        data: getBackendToFrontOffers([data])[0],
      };
      return adapterOffer as CurrentOffer;
    } catch {
      toast.error(OFFER_FETCH_FAIL_MESSAGE);
      const error = {
        isFound: false,
        data: undefined,
      };
      return error as CurrentOffer;
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk(
  'data/fetchNearbyOffers',
  async (offerId: number, thunkAPI) => {
    try {
      const {data} = await api.get<BackendOffers>(`${ApiRoute.Hotels}/${offerId}/nearby`);
      const adapterOffers = getBackendToFrontOffers(data);
      return adapterOffers as Offers;
    } catch {
      toast.error(NEARBY_FETCH_FAIL_MESSAGE);
      return null;
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'data/fetchReviews',
  async (offerId: number, thunkAPI) => {
    try {
      const {data} = await api.get<Reviews>(`${ApiRoute.Reviews}/${offerId}`);
      const adapterReviews = getBackendToFrontOffers(data);
      return adapterReviews as Reviews;
    } catch {
      toast.error(REVIEW_FETCH_FAIL_MESSAGE);
      return null;
    }
  },
);

export const sendReviewAction = createAsyncThunk(
  'data/sendReview',
  async (review : NewReview, thunkAPI) => {
    const {id: offerId, comment: {rating, comment}} = review;
    try {
      await api.post<NewComment>(`${ApiRoute.Reviews}/${offerId}`, {comment, rating});
    } catch {
      toast.error(REVIEW_SEND_FAIL_MESSAGE);
    }
  },
);
