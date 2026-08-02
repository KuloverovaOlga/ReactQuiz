import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  isSearching: false
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    }
  }
});


export const { setSearchValue, setIsSearching } = searchSlice.actions;

export default searchSlice.reducer;
