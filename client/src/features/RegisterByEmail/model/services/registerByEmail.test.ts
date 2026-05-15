import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { registerByEmail } from './registerByEmail';
import { registerReducer } from '../slice/registerSlice';
import { userReducer } from '@/entities/User';
import type { User } from '@/entities/User';

const makeStore = (api: object) =>
    configureStore({
        reducer: { register: registerReducer, user: userReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const mockUser: User = { id: 'u1', username: 'newuser', email: 'new@mail.ru', token: 'tok-xyz' };
const creds = { username: 'newuser', email: 'new@mail.ru', password: 'secret' };

describe('registerByEmail', () => {
    it('fulfilled — POSTs to /register with credentials', async () => {
        const api = { post: vi.fn().mockResolvedValue({ data: mockUser }) };
        const store = makeStore(api);

        await store.dispatch(registerByEmail(creds) as ReturnType<typeof registerByEmail>);

        expect(api.post).toHaveBeenCalledWith('/register', creds);
    });

    it('fulfilled — stores authData in user state via setAuthData', async () => {
        const api = { post: vi.fn().mockResolvedValue({ data: mockUser }) };
        const store = makeStore(api);

        await store.dispatch(registerByEmail(creds) as ReturnType<typeof registerByEmail>);

        expect(store.getState().user.authData).toEqual(mockUser);
        expect(store.getState().register.isLoading).toBe(false);
    });

    it('rejected — rejects with "Ошибка регистрации" when token missing', async () => {
        const api = { post: vi.fn().mockResolvedValue({ data: { id: 'u1', username: 'user' } }) };
        const store = makeStore(api);

        const result = await store.dispatch(registerByEmail(creds) as ReturnType<typeof registerByEmail>);

        expect(registerByEmail.rejected.match(result)).toBe(true);
        expect((result as ReturnType<typeof registerByEmail.rejected>).payload).toBe('Ошибка регистрации');
    });

    it('rejected — uses server error message when available', async () => {
        const api = {
            post: vi.fn().mockRejectedValue({ response: { data: { message: 'Email уже занят' } } })
        };
        const store = makeStore(api);

        const result = await store.dispatch(registerByEmail(creds) as ReturnType<typeof registerByEmail>);

        expect((result as ReturnType<typeof registerByEmail.rejected>).payload).toBe('Email уже занят');
    });

    it('rejected — falls back to generic error when no server message', async () => {
        const api = { post: vi.fn().mockRejectedValue(new Error('Network')) };
        const store = makeStore(api);

        const result = await store.dispatch(registerByEmail(creds) as ReturnType<typeof registerByEmail>);

        expect((result as ReturnType<typeof registerByEmail.rejected>).payload).toBe('Ошибка регистрации');
    });

    it('sets isLoading=true while in flight', async () => {
        let resolve!: (v: unknown) => void;
        const api = {
            post: vi.fn().mockReturnValue(
                new Promise((r) => {
                    resolve = r;
                })
            )
        };
        const store = makeStore(api);

        const dispatch = store.dispatch(registerByEmail(creds) as ReturnType<typeof registerByEmail>);
        expect(store.getState().register.isLoading).toBe(true);

        resolve({ data: mockUser });
        await dispatch;
        expect(store.getState().register.isLoading).toBe(false);
    });
});
