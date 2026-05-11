import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { TakingSession } from '../types/InviteLink';

export const fetchSessionByToken = createAsyncThunk<TakingSession, string, ThunkConfig<string>>(
    'inviteLink/fetchSessionByToken',
    async (token, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<TakingSession>(`/public/quiz/${token}`);
            return response.data;
        } catch {
            return rejectWithValue('Ссылка недействительна или тест не опубликован');
        }
    },
);
