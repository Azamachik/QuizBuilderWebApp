import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Quiz } from '../types/Quiz';

export const fetchQuizById = createAsyncThunk<Quiz, string, ThunkConfig<string>>(
    'quizzes/fetchQuizById',
    async (id, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<Quiz>(`/quizzes/${id}`);
            return response.data;
        } catch {
            return rejectWithValue('Ошибка загрузки теста');
        }
    },
);
