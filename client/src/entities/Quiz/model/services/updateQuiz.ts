import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Quiz } from '../types/Quiz';

export interface UpdateQuizPayload {
    id: string;
    data: Pick<Quiz, 'title'> & Partial<Pick<Quiz, 'description'>>;
}

export const updateQuiz = createAsyncThunk<Quiz, UpdateQuizPayload, ThunkConfig<string>>(
    'quizzes/updateQuiz',
    async ({ id, data }, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.patch<Quiz>(`/quizzes/${id}`, data);
            return response.data;
        } catch {
            return rejectWithValue('Ошибка обновления теста');
        }
    },
);
