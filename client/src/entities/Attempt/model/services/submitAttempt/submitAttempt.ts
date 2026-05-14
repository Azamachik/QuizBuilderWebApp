import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Attempt, AttemptCreate } from '../../types/Attempt';

export const submitAttempt = createAsyncThunk<Attempt, AttemptCreate, ThunkConfig<string>>(
    'attempt/submitAttempt',
    async (data, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.post<Attempt>('/public/attempts', data);
            return response.data;
        } catch {
            return rejectWithValue('Ошибка отправки результатов');
        }
    }
);
