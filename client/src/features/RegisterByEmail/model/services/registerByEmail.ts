import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthData } from '@/entities/User';
import type { User } from '@/entities/User';
import type { ThunkConfig } from '@/app/providers/StoreProvider';

interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

export const registerByEmail = createAsyncThunk<User, RegisterCredentials, ThunkConfig<string>>(
    'register/registerByEmail',
    async (credentials, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.post<User>('/register', credentials);
            if (!response.data?.token) {
                return rejectWithValue('Ошибка регистрации');
            }
            dispatch(setAuthData(response.data));
            return response.data;
        } catch (err: unknown) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
                'Ошибка регистрации';
            return rejectWithValue(message);
        }
    },
);
