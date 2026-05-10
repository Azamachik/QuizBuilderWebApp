import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCAL_STORAGE_KEY, USER_TOKEN_KEY } from '@/shared/consts/localStorage';
import type { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<User>) => {
            state.authData = payload;
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(payload));
            localStorage.setItem(USER_TOKEN_KEY, payload.token);
        },
        initUser: (state) => {
            const stored = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
            if (stored) {
                try {
                    state.authData = JSON.parse(stored) as User;
                } catch {
                    // corrupted storage — ignore
                }
            }
            state._inited = true;
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
            localStorage.removeItem(USER_TOKEN_KEY);
        },
    },
});

export const { setAuthData, initUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
