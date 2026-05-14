import { describe, it, expect, beforeEach } from 'vitest';
import { userReducer, setAuthData, initUser, logout } from './userSlice';
import type { UserSchema } from '../types/user';
import { USER_LOCAL_STORAGE_KEY, USER_TOKEN_KEY } from '@/shared/consts/localStorage';

const mockUser = {
    id: '1',
    username: 'testuser',
    email: 'test@mail.ru',
    token: 'test-token',
    createdAt: '2023-01-01'
};

describe('userSlice', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('returns initial state', () => {
        expect(userReducer(undefined, { type: '' })).toEqual({ _inited: false });
    });

    describe('setAuthData', () => {
        it('sets authData in state', () => {
            const state = userReducer(undefined, setAuthData(mockUser));
            expect(state.authData).toEqual(mockUser);
        });

        it('persists user to localStorage', () => {
            userReducer(undefined, setAuthData(mockUser));
            expect(localStorage.getItem(USER_LOCAL_STORAGE_KEY)).toBe(JSON.stringify(mockUser));
        });

        it('persists token to localStorage', () => {
            userReducer(undefined, setAuthData(mockUser));
            expect(localStorage.getItem(USER_TOKEN_KEY)).toBe(mockUser.token);
        });
    });

    describe('initUser', () => {
        it('reads user from localStorage and sets authData', () => {
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(mockUser));
            const state = userReducer(undefined, initUser());
            expect(state.authData).toEqual(mockUser);
            expect(state._inited).toBe(true);
        });

        it('sets _inited to true when localStorage is empty', () => {
            const state = userReducer(undefined, initUser());
            expect(state.authData).toBeUndefined();
            expect(state._inited).toBe(true);
        });

        it('ignores corrupted localStorage and still marks _inited', () => {
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, 'not-valid-json{{{');
            const state = userReducer(undefined, initUser());
            expect(state.authData).toBeUndefined();
            expect(state._inited).toBe(true);
        });
    });

    describe('logout', () => {
        it('clears authData from state', () => {
            const initial: UserSchema = { authData: mockUser, _inited: true };
            const state = userReducer(initial, logout());
            expect(state.authData).toBeUndefined();
        });

        it('removes user from localStorage', () => {
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(mockUser));
            localStorage.setItem(USER_TOKEN_KEY, mockUser.token);
            userReducer({ authData: mockUser, _inited: true }, logout());
            expect(localStorage.getItem(USER_LOCAL_STORAGE_KEY)).toBeNull();
            expect(localStorage.getItem(USER_TOKEN_KEY)).toBeNull();
        });
    });
});
