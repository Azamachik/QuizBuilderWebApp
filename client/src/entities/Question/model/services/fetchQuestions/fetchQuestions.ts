import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Question } from '../../types/Question';

export const fetchQuestions = createAsyncThunk<Question[], string, ThunkConfig<string>>(
    'questions/fetchQuestions',
    async (quizId, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<Question[]>('/questions', { params: { quizId } });
            return response.data;
        } catch {
            return rejectWithValue('Ошибка загрузки вопросов');
        }
    }
);
