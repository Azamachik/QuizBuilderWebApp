import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Question } from '../types/Question';

export type CreateQuestionPayload = Omit<Question, 'id'>;

export const createQuestion = createAsyncThunk<Question, CreateQuestionPayload, ThunkConfig<string>>(
    'questions/createQuestion',
    async (payload, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.post<Question>('/questions', payload);
            // update denormalized questionsCount on the quiz
            const questions = await extra.api.get<Question[]>('/questions', { params: { quizId: payload.quizId } });
            await extra.api.patch(`/quizzes/${payload.quizId}`, { questionsCount: questions.data.length });
            return response.data;
        } catch {
            return rejectWithValue('Ошибка создания вопроса');
        }
    },
);
