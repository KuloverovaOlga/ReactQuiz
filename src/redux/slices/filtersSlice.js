import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategoryIndex: 0
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategoryIndex: (state, action) => {
      state.activeCategoryIndex = action.payload;
    }
  }
});


export const { setActiveCategoryIndex } = filtersSlice.actions;

export default filtersSlice.reducer;
