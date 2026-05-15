import { describe, it, expect } from 'vitest';
import { loginReducer, setEmail, setPassword } from './loginSlice';
import { loginByEmail } from '../services/loginByEmail';
import type { LoginSchema } from '../types/loginSchema';
import type { User } from '@/entities/User';

const initial: LoginSchema = { email: '', password: '', isLoading: false };
const mockUser: User = { id: 'u1', username: 'user', token: 'tok' };
const creds = { email: '', password: '' };

describe('loginSlice', () => {
    it('returns initial state', () => {
        expect(loginReducer(undefined, { type: '' })).toEqual(initial);
    });

    describe('setEmail', () => {
        it('updates email', () => {
            expect(loginReducer(initial, setEmail('user@mail.ru')).email).toBe('user@mail.ru');
        });

        it('replaces previous email', () => {
            const state = loginReducer({ ...initial, email: 'old@mail.ru' }, setEmail('new@mail.ru'));
            expect(state.email).toBe('new@mail.ru');
        });
    });

    describe('setPassword', () => {
        it('updates password', () => {
            expect(loginReducer(initial, setPassword('secret')).password).toBe('secret');
        });
    });

    describe('loginByEmail async thunk', () => {
        it('pending — sets isLoading=true, clears error', () => {
            const state = loginReducer({ ...initial, error: 'old' }, loginByEmail.pending('', creds));
            expect(state.isLoading).toBe(true);
            expect(state.error).toBeUndefined();
        });

        it('fulfilled — sets isLoading=false', () => {
            const state = loginReducer({ ...initial, isLoading: true }, loginByEmail.fulfilled(mockUser, '', creds));
            expect(state.isLoading).toBe(false);
        });

        it('rejected — clears isLoading and stores error', () => {
            const state = loginReducer(
                { ...initial, isLoading: true },
                loginByEmail.rejected(null, '', creds, 'Неверный email или пароль')
            );
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe('Неверный email или пароль');
        });
    });
});
