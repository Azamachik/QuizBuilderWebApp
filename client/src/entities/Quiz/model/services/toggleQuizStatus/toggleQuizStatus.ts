import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Quiz } from '../../types/Quiz';

export const toggleQuizStatus = createAsyncThunk<Quiz, { id: string; isPublished: boolean }, ThunkConfig<string>>(
    'quizzes/toggleQuizStatus',
    async ({ id, isPublished }, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.patch<Quiz>(`/quizzes/${id}`, { isPublished: !isPublished });
            return response.data;
        } catch {
            return rejectWithValue('Ошибка смены статуса');
        }
    }
);
