import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { QuestionSchema } from '../types/QuestionSchema';
import type { Question } from '../types/Question';
import { fetchQuestions } from '../services/fetchQuestions/fetchQuestions';
import { saveQuestions } from '../services/saveQuestions/saveQuestions';

const initialState: QuestionSchema = {
    questions: [],
    formData: [],
    isLoading: false,
    isSaving: false
};

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestionToForm: (state, { payload }: PayloadAction<Question>) => {
            state.formData.push(payload);
        },
        updateQuestionInForm: (state, { payload }: PayloadAction<{ id: string; data: Partial<Omit<Question, 'id' | 'quizId'>> }>) => {
            const idx = state.formData.findIndex((q) => q.id === payload.id);
            if (idx !== -1) state.formData[idx] = { ...state.formData[idx], ...payload.data };
        },
        removeQuestionFromForm: (state, { payload }: PayloadAction<string>) => {
            state.formData = state.formData.filter((q) => q.id !== payload).map((q, i) => ({ ...q, order: i + 1 }));
        },
        reorderQuestions: (state, { payload }: PayloadAction<Question[]>) => {
            state.formData = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchQuestions.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.questions = payload;
                state.formData = payload;
            })
            .addCase(fetchQuestions.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(saveQuestions.pending, (state) => {
                state.isSaving = true;
                state.error = undefined;
            })
            .addCase(saveQuestions.fulfilled, (state, { payload }) => {
                state.isSaving = false;
                state.questions = payload;
                state.formData = payload;
            })
            .addCase(saveQuestions.rejected, (state, { payload }) => {
                state.isSaving = false;
                state.error = typeof payload === 'string' ? payload : 'Ошибка сохранения';
            });
    }
});

export const { addQuestionToForm, updateQuestionInForm, removeQuestionFromForm, reorderQuestions } = questionSlice.actions;
export const questionReducer = questionSlice.reducer;
