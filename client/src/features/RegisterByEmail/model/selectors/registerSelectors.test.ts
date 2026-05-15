import { describe, it, expect } from 'vitest';
import {
    getRegisterUsername,
    getRegisterEmail,
    getRegisterPassword,
    getRegisterConfirm,
    getRegisterIsLoading,
    getRegisterError,
} from './getRegister';

const withSlice = {
    register: { username: 'alice', email: 'a@b.ru', password: 'pass', confirm: 'pass', isLoading: true, error: 'err' },
};
const withoutSlice = {};
const withoutError = { register: { username: '', email: '', password: '', confirm: '', isLoading: false } };

describe('register selectors', () => {
    describe('getRegisterUsername', () => {
        it('returns username', () => expect(getRegisterUsername(withSlice)).toBe('alice'));
        it('returns "" when slice missing', () => expect(getRegisterUsername(withoutSlice)).toBe(''));
    });

    describe('getRegisterEmail', () => {
        it('returns email', () => expect(getRegisterEmail(withSlice)).toBe('a@b.ru'));
        it('returns "" when slice missing', () => expect(getRegisterEmail(withoutSlice)).toBe(''));
    });

    describe('getRegisterPassword', () => {
        it('returns password', () => expect(getRegisterPassword(withSlice)).toBe('pass'));
        it('returns "" when slice missing', () => expect(getRegisterPassword(withoutSlice)).toBe(''));
    });

    describe('getRegisterConfirm', () => {
        it('returns confirm', () => expect(getRegisterConfirm(withSlice)).toBe('pass'));
        it('returns "" when slice missing', () => expect(getRegisterConfirm(withoutSlice)).toBe(''));
    });

    describe('getRegisterIsLoading', () => {
        it('returns true when loading', () => expect(getRegisterIsLoading(withSlice)).toBe(true));
        it('returns false when slice missing', () => expect(getRegisterIsLoading(withoutSlice)).toBe(false));
    });

    describe('getRegisterError', () => {
        it('returns error string', () => expect(getRegisterError(withSlice)).toBe('err'));
        it('returns undefined when no error', () => expect(getRegisterError(withoutError)).toBeUndefined());
        it('returns undefined when slice missing', () => expect(getRegisterError(withoutSlice)).toBeUndefined());
    });
});
