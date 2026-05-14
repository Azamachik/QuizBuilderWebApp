import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Profile } from '../../types/profile';

interface UpdatePayload {
    userId: string;
    data: Pick<Profile, 'firstName' | 'lastName' | 'avatarUrl'>;
}

export const updateProfileData = createAsyncThunk<Profile, UpdatePayload, ThunkConfig<string>>(
    'profile/updateProfileData',
    async ({ userId, data }, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.patch<Profile>(`/profile/${userId}`, data);
            return response.data;
        } catch {
            return rejectWithValue('Ошибка обновления профиля');
        }
    }
);
