import { createSlice } from '@reduxjs/toolkit';
import type { InviteLinkSchema } from '../types/InviteLinkSchema';
import { fetchSessionByToken } from '../services/fetchSessionByToken';

const initialState: InviteLinkSchema = {
    isLoading: false
};

export const inviteLinkSlice = createSlice({
    name: 'inviteLink',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSessionByToken.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchSessionByToken.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.session = payload;
            })
            .addCase(fetchSessionByToken.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
    }
});

export const inviteLinkReducer = inviteLinkSlice.reducer;
