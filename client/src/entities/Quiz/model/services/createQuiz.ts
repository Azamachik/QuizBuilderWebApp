import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Quiz } from '../types/Quiz';

export interface CreateQuizPayload {
    title: string;
    description?: string;
    authorId: string;
}

export const createQuiz = createAsyncThunk<Quiz, CreateQuizPayload, ThunkConfig<string>>(
    'quizzes/createQuiz',
    async (payload, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.post<Quiz>('/quizzes', {
                ...payload,
                isPublished: false,
                attemptsCount: 0,
                createdAt: new Date().toISOString(),
            });
            return response.data;
        } catch {
            return rejectWithValue('Ошибка создания теста');
        }
    },
);
