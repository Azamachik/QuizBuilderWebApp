import { createSlice } from '@reduxjs/toolkit';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import type { ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    isLoading: false
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchProfileData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.data = payload;
            })
            .addCase(fetchProfileData.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(updateProfileData.fulfilled, (state, { payload }) => {
                state.data = payload;
            })
            .addCase(updateProfileData.rejected, (state, { payload }) => {
                state.error = payload;
            });
    }
});

export const profileReducer = profileSlice.reducer;
