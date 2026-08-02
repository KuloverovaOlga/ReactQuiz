import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../constants';

const initialState = {
  data: null,
  step: 0,
  userAnswers: {},
  status: 'loading'
};

export const fetchQuizById = createAsyncThunk('quiz/fetchQuizById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_URL}/quizzes/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const currentQuisSlise = createSlice({
  name: 'currentQuiz',
  initialState,
  reducers: {
    nextQuestion: (state) => {
      if (state.data && state.step < state.data.questions.length) {
        state.step += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.step > 0) {
        state.step -= 1;
      }
    },
    selectAnswer: (state, action) => {
      const { step, answerIndex } = action.payload;
      state.userAnswers[step] = answerIndex;
    },
    resetQuiz: (state) => {
      state.step = 0;
      state.userAnswers = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizById.pending, (state) => {
        state.status = 'loading';
        state.data = null;
        state.step = 0;
        state.userAnswers = {};
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchQuizById.rejected, (state) => {
        state.status = 'error';
      });
  }
});

export const { nextQuestion, prevQuestion, selectAnswer, resetQuiz } = currentQuisSlise.actions;

export default currentQuisSlise.reducer;
