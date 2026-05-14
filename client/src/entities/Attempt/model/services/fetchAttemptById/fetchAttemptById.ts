import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Attempt } from '../../types/Attempt';

export const fetchAttemptById = createAsyncThunk<Attempt, string, ThunkConfig<string>>(
    'attempt/fetchAttemptById',
    async (id, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<Attempt>(`/public/attempts/${id}`);
            return response.data;
        } catch {
            return rejectWithValue('Попытка не найдена');
        }
    }
);
