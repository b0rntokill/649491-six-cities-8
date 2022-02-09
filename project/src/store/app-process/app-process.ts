import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_SELECTED_CITY } from '../../const';
import { AppProcess } from '../../types/state';
import { setActivePlace, setSelectCity } from '../action';

const initialState: AppProcess = {
  selectedCity: DEFAULT_SELECTED_CITY,
  activePlace: null,
};

const appProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setSelectCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(setActivePlace, (state, action) => {
      state.activePlace = action.payload;
    });
});

export { appProcess };

