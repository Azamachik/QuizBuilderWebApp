import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { loginByEmail } from './loginByEmail';
import { loginReducer } from '../slice/loginSlice';
import { userReducer } from '@/entities/User';
import type { User } from '@/entities/User';

const makeStore = (api: object) =>
    configureStore({
        reducer: { login: loginReducer, user: userReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const mockUser: User = { id: 'u1', username: 'user', email: 'u@mail.ru', token: 'jwt-abc' };
const creds = { email: 'u@mail.ru', password: '1234' };

describe('loginByEmail', () => {
    it('fulfilled — POSTs to /login with credentials', async () => {
        const api = { post: vi.fn().mockResolvedValue({ data: mockUser }) };
        const store = makeStore(api);

        await store.dispatch(loginByEmail(creds) as ReturnType<typeof loginByEmail>);

        expect(api.post).toHaveBeenCalledWith('/login', creds);
    });

    it('fulfilled — stores authData in user state via setAuthData', async () => {
        const api = { post: vi.fn().mockResolvedValue({ data: mockUser }) };
        const store = makeStore(api);

        await store.dispatch(loginByEmail(creds) as ReturnType<typeof loginByEmail>);

        expect(store.getState().user.authData).toEqual(mockUser);
        expect(store.getState().login.isLoading).toBe(false);
    });

    it('rejected — rejects with error when token missing in response', async () => {
        const api = { post: vi.fn().mockResolvedValue({ data: { id: 'u1', username: 'user' } }) };
        const store = makeStore(api);

        const result = await store.dispatch(loginByEmail(creds) as ReturnType<typeof loginByEmail>);

        expect(loginByEmail.rejected.match(result)).toBe(true);
        expect((result as ReturnType<typeof loginByEmail.rejected>).payload).toBe('Неверный email или пароль');
        expect(store.getState().user.authData).toBeUndefined();
    });

    it('rejected — rejects on API error', async () => {
        const api = { post: vi.fn().mockRejectedValue(new Error('Network')) };
        const store = makeStore(api);

        const result = await store.dispatch(loginByEmail(creds) as ReturnType<typeof loginByEmail>);

        expect(loginByEmail.rejected.match(result)).toBe(true);
        expect((result as ReturnType<typeof loginByEmail.rejected>).payload).toBe('Неверный email или пароль');
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

        const dispatch = store.dispatch(loginByEmail(creds) as ReturnType<typeof loginByEmail>);
        expect(store.getState().login.isLoading).toBe(true);

        resolve({ data: mockUser });
        await dispatch;
        expect(store.getState().login.isLoading).toBe(false);
    });
});
