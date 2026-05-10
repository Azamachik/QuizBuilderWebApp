import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { registerByEmail } from '../services/registerByEmail';
import type { RegisterSchema } from '../types/registerSchema';

const initialState: RegisterSchema = {
    username: '',
    email: '',
    password: '',
    confirm: '',
    isLoading: false,
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setUsername: (state, { payload }: PayloadAction<string>) => { state.username = payload; },
        setEmail:    (state, { payload }: PayloadAction<string>) => { state.email    = payload; },
        setPassword: (state, { payload }: PayloadAction<string>) => { state.password = payload; },
        setConfirm:  (state, { payload }: PayloadAction<string>) => { state.confirm  = payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerByEmail.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(registerByEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerByEmail.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
    },
});

export const { setUsername, setEmail, setPassword, setConfirm } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
