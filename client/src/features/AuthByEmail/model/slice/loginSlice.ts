import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loginByEmail } from '../services/loginByEmail';
import type { LoginSchema } from '../types/loginSchema';

const initialState: LoginSchema = {
    email: '',
    password: '',
    isLoading: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, { payload }: PayloadAction<string>) => { state.email = payload; },
        setPassword: (state, { payload }: PayloadAction<string>) => { state.password = payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByEmail.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(loginByEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByEmail.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
    },
});

export const { setEmail, setPassword } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
