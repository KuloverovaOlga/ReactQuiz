import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, PASSED_100_QUIZES_STORAGE } from '../../constants';

const savedPassedIds = JSON.parse(localStorage.getItem('passed100Quizzes')) || [];

const initialState = {
  quizes: [],
  status: 'idle',
  error: null,
  passed100Ids: savedPassedIds
};
export const fetchQuizzes = createAsyncThunk('quizes/fetchQuizzes', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_URL}/quizzes`);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const quizesSlice = createSlice({
  name: 'quizes',
  initialState,
  reducers: {
    addPassedQuizId: (state, action) => {
      const quizId = action.payload;
      if (!state.passed100Ids.includes(quizId)) {
        state.passed100Ids.push(quizId);
        localStorage.setItem(PASSED_100_QUIZES_STORAGE, JSON.stringify(state.passed100Ids));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.status = 'success';
        state.quizes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  }
});

export const { addPassedQuizId } = quizesSlice.actions;

export default quizesSlice.reducer;
