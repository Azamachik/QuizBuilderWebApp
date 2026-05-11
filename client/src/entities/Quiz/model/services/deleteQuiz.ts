import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';

export const deleteQuiz = createAsyncThunk<string, string, ThunkConfig<string>>(
    'quizzes/deleteQuiz',
    async (id, { extra, rejectWithValue }) => {
        try {
            await extra.api.delete(`/quizzes/${id}`);
            return id;
        } catch {
            return rejectWithValue('Ошибка удаления теста');
        }
    },
);
