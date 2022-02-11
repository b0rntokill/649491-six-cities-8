import { createSlice } from '@reduxjs/toolkit';
import { AppData } from '../../types/state';
import {
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  sendReviewAction
} from './async-actions';

const initialState: AppData = {
  offers: [],
  currentOffer: {
    isFound: true,
    data: undefined,
  },
  reviews: null,
  nearbyPoints: null,
  isDataLoaded: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyPoints = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.isDataLoaded = true;
      });
  },
});

const {reducer} = dataSlice;

export const appData = reducer;
