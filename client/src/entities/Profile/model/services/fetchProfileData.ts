import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Profile } from '../types/profile';

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (userId, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<Profile>(`/profile/${userId}`);
            return response.data;
        } catch {
            return rejectWithValue('Ошибка загрузки профиля');
        }
    },
);
