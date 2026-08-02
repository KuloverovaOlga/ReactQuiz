import { configureStore } from '@reduxjs/toolkit';

import quizesReducer from './slices/quizesSlice';
import searchReducer from './slices/searchSlice';
import filtersReducer from './slices/filtersSlice';
import currentQuizReducer from './slices/currentQuisSlise';

export const store = configureStore({
  reducer: {
    quizes: quizesReducer,
    search: searchReducer,
    filters: filtersReducer,
    currentQuiz: currentQuizReducer
  }
});

export default store;
