import { describe, it, expect } from 'vitest';
import { getLoginEmail, getLoginPassword, getLoginIsLoading, getLoginError } from './getLogin';

const withSlice = { login: { email: 'u@mail.ru', password: 'pass', isLoading: true, error: 'Ошибка' } };
const withoutSlice = {};
const withoutError = { login: { email: '', password: '', isLoading: false } };

describe('login selectors', () => {
    describe('getLoginEmail', () => {
        it('returns email from state', () => {
            expect(getLoginEmail(withSlice)).toBe('u@mail.ru');
        });

        it('returns "" when slice is missing', () => {
            expect(getLoginEmail(withoutSlice)).toBe('');
        });
    });

    describe('getLoginPassword', () => {
        it('returns password from state', () => {
            expect(getLoginPassword(withSlice)).toBe('pass');
        });

        it('returns "" when slice is missing', () => {
            expect(getLoginPassword(withoutSlice)).toBe('');
        });
    });

    describe('getLoginIsLoading', () => {
        it('returns true when loading', () => {
            expect(getLoginIsLoading(withSlice)).toBe(true);
        });

        it('returns false when slice is missing', () => {
            expect(getLoginIsLoading(withoutSlice)).toBe(false);
        });
    });

    describe('getLoginError', () => {
        it('returns error string', () => {
            expect(getLoginError(withSlice)).toBe('Ошибка');
        });

        it('returns undefined when no error', () => {
            expect(getLoginError(withoutError)).toBeUndefined();
        });

        it('returns undefined when slice is missing', () => {
            expect(getLoginError(withoutSlice)).toBeUndefined();
        });
    });
});
