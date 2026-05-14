import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Question } from '../../types/Question';

export const saveQuestionsOrder = createAsyncThunk<void, Question[], ThunkConfig<string>>(
    'questions/saveQuestionsOrder',
    async (questions, { extra, rejectWithValue }) => {
        try {
            await Promise.all(questions.map((q) => extra.api.patch(`/questions/${q.id}`, { order: q.order })));
        } catch {
            return rejectWithValue('Ошибка сохранения порядка');
        }
    }
);
