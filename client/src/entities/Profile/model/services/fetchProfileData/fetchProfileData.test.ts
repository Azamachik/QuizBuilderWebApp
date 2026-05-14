import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { fetchProfileData } from './fetchProfileData';
import { profileReducer } from '../../slice/profileSlice';
import type { Profile } from '../../types/profile';

const makeStore = (api: object) =>
    configureStore({
        reducer: { profile: profileReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const mockProfile: Profile = {
    id: '1',
    firstName: 'Азамат',
    lastName: 'Каримов',
    avatarUrl: '',
    createdAt: '2023-01-01'
};

describe('fetchProfileData', () => {
    it('fulfilled — fetches from correct endpoint and stores profile', async () => {
        const api = { get: vi.fn().mockResolvedValue({ data: mockProfile }) };
        const store = makeStore(api);

        await store.dispatch(fetchProfileData('user1') as ReturnType<typeof fetchProfileData>);

        expect(api.get).toHaveBeenCalledWith('/profile/user1');
        expect(store.getState().profile.data).toEqual(mockProfile);
        expect(store.getState().profile.isLoading).toBe(false);
    });

    it('rejected — sets error on API failure', async () => {
        const api = { get: vi.fn().mockRejectedValue(new Error('Network error')) };
        const store = makeStore(api);

        await store.dispatch(fetchProfileData('user1') as ReturnType<typeof fetchProfileData>);

        expect(store.getState().profile.error).toBe('Ошибка загрузки профиля');
        expect(store.getState().profile.isLoading).toBe(false);
    });
});
