import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { updateProfileData } from './updateProfileData';
import { profileReducer } from '../../slice/profileSlice';
import type { Profile } from '../../types/profile';

const makeStore = (api: object, preloadedProfile?: Profile) =>
    configureStore({
        reducer: { profile: profileReducer },
        preloadedState: preloadedProfile ? { profile: { data: preloadedProfile, isLoading: false } } : undefined,
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const currentProfile: Profile = {
    id: 'u1',
    firstName: 'Азамат',
    lastName: 'Каримов',
    avatarUrl: '',
    createdAt: '2023-01-01'
};

const updatedProfile: Profile = { ...currentProfile, firstName: 'Azamat', avatarUrl: 'https://cdn.example.com/avatar.jpg' };

describe('updateProfileData', () => {
    it('fulfilled — PATCHes /profile/{userId} with provided data', async () => {
        const api = { patch: vi.fn().mockResolvedValue({ data: updatedProfile }) };
        const store = makeStore(api);

        await store.dispatch(
            updateProfileData({
                userId: 'u1',
                data: { firstName: 'Azamat', lastName: 'Каримов', avatarUrl: 'https://cdn.example.com/avatar.jpg' }
            }) as ReturnType<typeof updateProfileData>
        );

        expect(api.patch).toHaveBeenCalledWith('/profile/u1', {
            firstName: 'Azamat',
            lastName: 'Каримов',
            avatarUrl: 'https://cdn.example.com/avatar.jpg'
        });
    });

    it('fulfilled — stores updated profile in state', async () => {
        const api = { patch: vi.fn().mockResolvedValue({ data: updatedProfile }) };
        const store = makeStore(api, currentProfile);

        await store.dispatch(
            updateProfileData({
                userId: 'u1',
                data: { firstName: 'Azamat', lastName: 'Каримов', avatarUrl: '' }
            }) as ReturnType<typeof updateProfileData>
        );

        expect(store.getState().profile.data).toEqual(updatedProfile);
    });

    it('fulfilled — clears isLoading after completion', async () => {
        const api = { patch: vi.fn().mockResolvedValue({ data: updatedProfile }) };
        const store = makeStore(api);

        await store.dispatch(
            updateProfileData({
                userId: 'u1',
                data: { firstName: 'X', lastName: 'Y', avatarUrl: '' }
            }) as ReturnType<typeof updateProfileData>
        );

        expect(store.getState().profile.isLoading).toBe(false);
    });

    it('rejected — sets error message on API failure', async () => {
        const api = { patch: vi.fn().mockRejectedValue(new Error('Network error')) };
        const store = makeStore(api);

        await store.dispatch(
            updateProfileData({
                userId: 'u1',
                data: { firstName: 'X', lastName: 'Y', avatarUrl: '' }
            }) as ReturnType<typeof updateProfileData>
        );

        expect(store.getState().profile.error).toBe('Ошибка обновления профиля');
    });

    it('rejected — does not change existing profile data', async () => {
        const api = { patch: vi.fn().mockRejectedValue(new Error('fail')) };
        const store = makeStore(api, currentProfile);

        await store.dispatch(
            updateProfileData({
                userId: 'u1',
                data: { firstName: 'X', lastName: 'Y', avatarUrl: '' }
            }) as ReturnType<typeof updateProfileData>
        );

        expect(store.getState().profile.data).toEqual(currentProfile);
    });
});
