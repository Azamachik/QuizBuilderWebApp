import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthData } from '@/entities/User';
import type { User } from '@/entities/User';
import type { ThunkConfig } from '@/app/providers/StoreProvider';

interface LoginCredentials {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<User, LoginCredentials, ThunkConfig<string>>(
    'login/loginByEmail',
    async (credentials, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.post<User>('/login', credentials);
            if (!response.data?.token) {
                return rejectWithValue('Неверный email или пароль');
            }
            dispatch(setAuthData(response.data));
            return response.data;
        } catch {
            return rejectWithValue('Неверный email или пароль');
        }
    },
);
