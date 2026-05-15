import { describe, it, expect } from 'vitest';
import { registerReducer, setUsername, setEmail, setPassword, setConfirm } from './registerSlice';
import { registerByEmail } from '../services/registerByEmail';
import type { RegisterSchema } from '../types/registerSchema';
import type { User } from '@/entities/User';

const initial: RegisterSchema = { username: '', email: '', password: '', confirm: '', isLoading: false };
const mockUser: User = { id: 'u1', username: 'newuser', token: 'tok' };
const creds = { username: '', email: '', password: '' };

describe('registerSlice', () => {
    it('returns initial state', () => {
        expect(registerReducer(undefined, { type: '' })).toEqual(initial);
    });

    it('setUsername updates username', () => {
        expect(registerReducer(initial, setUsername('alice')).username).toBe('alice');
    });

    it('setEmail updates email', () => {
        expect(registerReducer(initial, setEmail('a@b.ru')).email).toBe('a@b.ru');
    });

    it('setPassword updates password', () => {
        expect(registerReducer(initial, setPassword('pass123')).password).toBe('pass123');
    });

    it('setConfirm updates confirm', () => {
        expect(registerReducer(initial, setConfirm('pass123')).confirm).toBe('pass123');
    });

    describe('registerByEmail async thunk', () => {
        it('pending — sets isLoading=true, clears error', () => {
            const state = registerReducer(
                { ...initial, error: 'old' },
                registerByEmail.pending('', creds),
            );
            expect(state.isLoading).toBe(true);
            expect(state.error).toBeUndefined();
        });

        it('fulfilled — clears isLoading', () => {
            const state = registerReducer(
                { ...initial, isLoading: true },
                registerByEmail.fulfilled(mockUser, '', creds),
            );
            expect(state.isLoading).toBe(false);
        });

        it('rejected — clears isLoading and stores error', () => {
            const state = registerReducer(
                { ...initial, isLoading: true },
                registerByEmail.rejected(null, '', creds, 'Ошибка регистрации'),
            );
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe('Ошибка регистрации');
        });
    });
});
