import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (userId, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<Profile>(`/profile/${userId}`);
            return response.data;
        } catch (e: unknown) {
            const status = (e as { response?: { status?: number } })?.response?.status;
            if (status === 404) {
                try {
                    const created = await extra.api.post<Profile>('/profile', {
                        id: userId,
                        firstName: '',
                        lastName: '',
                        avatarUrl: '',
                        createdAt: new Date().toLocaleDateString('ru-RU')
                    });
                    return created.data;
                } catch {
                    return rejectWithValue('Ошибка загрузки профиля');
                }
            }
            return rejectWithValue('Ошибка загрузки профиля');
        }
    }
);
