import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Quiz } from '../../types/Quiz';

export const fetchQuizzes = createAsyncThunk<Quiz[], string, ThunkConfig<string>>(
    'quizzes/fetchQuizzes',
    async (authorId, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<Quiz[]>('/quizzes', { params: { authorId } });
            return response.data;
        } catch {
            return rejectWithValue('Ошибка загрузки тестов');
        }
    }
);
