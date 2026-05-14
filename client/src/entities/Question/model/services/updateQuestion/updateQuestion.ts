import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Question } from '../../types/Question';

export interface UpdateQuestionPayload {
    id: string;
    data: Partial<Omit<Question, 'id' | 'quizId'>>;
}

export const updateQuestion = createAsyncThunk<Question, UpdateQuestionPayload, ThunkConfig<string>>(
    'questions/updateQuestion',
    async ({ id, data }, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.patch<Question>(`/questions/${id}`, data);
            return response.data;
        } catch {
            return rejectWithValue('Ошибка обновления вопроса');
        }
    }
);
