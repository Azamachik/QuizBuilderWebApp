import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Question } from '@/entities/Question';
import type { AttemptSchema } from '../types/AttemptSchema';
import { submitAttempt } from '../services/submitAttempt';
import { fetchAttemptById } from '../services/fetchAttemptById';

const initialState: AttemptSchema = {
    isLoading: false,
    isSubmitting: false,
};

export const attemptSlice = createSlice({
    name: 'attempt',
    initialState,
    reducers: {
        setSessionQuestions: (state, { payload }: PayloadAction<Question[]>) => {
            state.sessionQuestions = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitAttempt.pending, (state) => {
                state.isSubmitting = true;
                state.error = undefined;
            })
            .addCase(submitAttempt.fulfilled, (state, { payload }) => {
                state.isSubmitting = false;
                state.currentAttempt = payload;
            })
            .addCase(submitAttempt.rejected, (state, { payload }) => {
                state.isSubmitting = false;
                state.error = payload;
            })
            .addCase(fetchAttemptById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchAttemptById.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.currentAttempt = payload;
            })
            .addCase(fetchAttemptById.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
    },
});

export const { setSessionQuestions } = attemptSlice.actions;
export const attemptReducer = attemptSlice.reducer;
