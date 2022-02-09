import { createReducer } from '@reduxjs/toolkit';
import { AppData } from '../../types/state';
import { getLoadNearbyPoints, getLoadOffer, getLoadOffers, getLoadReviews } from '../action';

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

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(getLoadOffers, (state, action) => {
      const {offers, isDataLoaded} = action.payload;
      state.offers = offers;
      state.isDataLoaded = isDataLoaded;
    })
    .addCase(getLoadOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(getLoadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(getLoadNearbyPoints, (state, action) => {
      state.nearbyPoints = action.payload;
    });
});

export { appData };

