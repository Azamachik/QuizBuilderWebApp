import { createSlice } from '@reduxjs/toolkit';
import type { QuizSchema } from '../types/QuizSchema';
import { fetchQuizzes } from '../services/fetchQuizzes/fetchQuizzes';
import { fetchQuizById } from '../services/fetchQuizById/fetchQuizById';
import { createQuiz } from '../services/createQuiz/createQuiz';
import { updateQuiz } from '../services/updateQuiz/updateQuiz';
import { deleteQuiz } from '../services/deleteQuiz/deleteQuiz';
import { toggleQuizStatus } from '../services/toggleQuizStatus/toggleQuizStatus';

const initialState: QuizSchema = {
    quizzes: [],
    isLoading: false,
    currentQuizIsLoading: false
};

export const quizSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchQuizzes
            .addCase(fetchQuizzes.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchQuizzes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.quizzes = payload;
            })
            .addCase(fetchQuizzes.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // fetchQuizById
            .addCase(fetchQuizById.pending, (state) => {
                state.currentQuizIsLoading = true;
                state.currentQuizError = undefined;
            })
            .addCase(fetchQuizById.fulfilled, (state, { payload }) => {
                state.currentQuizIsLoading = false;
                state.currentQuiz = payload;
            })
            .addCase(fetchQuizById.rejected, (state, { payload }) => {
                state.currentQuizIsLoading = false;
                state.currentQuizError = payload;
            })
            // createQuiz
            .addCase(createQuiz.fulfilled, (state, { payload }) => {
                state.quizzes.push(payload);
            })
            // updateQuiz
            .addCase(updateQuiz.fulfilled, (state, { payload }) => {
                const idx = state.quizzes.findIndex((q) => q.id === payload.id);
                if (idx !== -1) state.quizzes[idx] = payload;
                if (state.currentQuiz?.id === payload.id) state.currentQuiz = payload;
            })
            // deleteQuiz
            .addCase(deleteQuiz.fulfilled, (state, { payload }) => {
                state.quizzes = state.quizzes.filter((q) => q.id !== payload);
            })
            // toggleQuizStatus
            .addCase(toggleQuizStatus.fulfilled, (state, { payload }) => {
                const idx = state.quizzes.findIndex((q) => q.id === payload.id);
                if (idx !== -1) state.quizzes[idx] = payload;
                if (state.currentQuiz?.id === payload.id) state.currentQuiz = payload;
            });
    }
});

export const quizReducer = quizSlice.reducer;
