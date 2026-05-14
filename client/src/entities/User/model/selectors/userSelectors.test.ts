import { describe, it, expect } from 'vitest';
import { getUserData } from './getUserData';
import { getUserIsInited } from './getUserIsInited';
import type { UserSchema } from '../types/user';

const mockUser = { id: '1', username: 'testuser', token: 'tok' };

describe('getUserData', () => {
    it('returns authData when set', () => {
        const state = { user: { authData: mockUser, _inited: true } as UserSchema };
        expect(getUserData(state)).toEqual(mockUser);
    });

    it('returns undefined when authData is not set', () => {
        const state = { user: { _inited: true } as UserSchema };
        expect(getUserData(state)).toBeUndefined();
    });
});

describe('getUserIsInited', () => {
    it('returns true when _inited is true', () => {
        const state = { user: { _inited: true } as UserSchema };
        expect(getUserIsInited(state)).toBe(true);
    });

    it('returns false when _inited is false', () => {
        const state = { user: { _inited: false } as UserSchema };
        expect(getUserIsInited(state)).toBe(false);
    });
});
