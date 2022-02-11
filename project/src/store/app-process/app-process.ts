import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_SELECTED_CITY } from '../../const';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  selectedCity: DEFAULT_SELECTED_CITY,
  activePlace: null,
};

const appProcessSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setSelectCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    setActivePlace: (state, action) => {
      state.activePlace = action.payload;
    },
  },
});

const {actions, reducer} = appProcessSlice;

export const {
  setSelectCity,
  setActivePlace,
} = actions;

export const appProcess = reducer;
