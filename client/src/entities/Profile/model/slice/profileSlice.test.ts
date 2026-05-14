import { describe, it, expect } from 'vitest';
import { profileReducer } from './profileSlice';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import type { ProfileSchema } from '../types/profile';
import type { Profile } from '../types/profile';

const mockProfile: Profile = {
    id: '1',
    firstName: 'Азамат',
    lastName: 'Каримов',
    avatarUrl: '',
    createdAt: '2023-01-01'
};

const initialState: ProfileSchema = { isLoading: false };

describe('profileSlice', () => {
    it('returns initial state', () => {
        expect(profileReducer(undefined, { type: '' })).toEqual(initialState);
    });

    describe('fetchProfileData', () => {
        it('pending — sets isLoading, clears error', () => {
            const state = profileReducer({ ...initialState, error: 'old' }, fetchProfileData.pending('', ''));
            expect(state.isLoading).toBe(true);
            expect(state.error).toBeUndefined();
        });

        it('fulfilled — clears isLoading, sets profile data', () => {
            const state = profileReducer({ ...initialState, isLoading: true }, fetchProfileData.fulfilled(mockProfile, '', ''));
            expect(state.isLoading).toBe(false);
            expect(state.data).toEqual(mockProfile);
        });

        it('rejected — clears isLoading, stores error', () => {
            const state = profileReducer(
                { ...initialState, isLoading: true },
                fetchProfileData.rejected(null, '', '', 'Ошибка загрузки профиля')
            );
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe('Ошибка загрузки профиля');
        });
    });

    describe('updateProfileData', () => {
        const updateArg = { userId: '1', data: { firstName: 'Новое', lastName: 'Имя', avatarUrl: '' } };

        it('fulfilled — replaces profile data', () => {
            const updated: Profile = { ...mockProfile, firstName: 'Новое', lastName: 'Имя' };
            const state = profileReducer({ ...initialState, data: mockProfile }, updateProfileData.fulfilled(updated, '', updateArg));
            expect(state.data?.firstName).toBe('Новое');
            expect(state.data?.lastName).toBe('Имя');
        });

        it('rejected — stores error, keeps existing data', () => {
            const state = profileReducer(
                { ...initialState, data: mockProfile },
                updateProfileData.rejected(null, '', updateArg, 'Ошибка обновления профиля')
            );
            expect(state.error).toBe('Ошибка обновления профиля');
            expect(state.data).toEqual(mockProfile);
        });
    });
});
