import { describe, it, expect } from 'vitest';
import {
    getProfileData,
    getProfileIsLoading,
    getProfileError,
    getProfileFirstName,
    getProfileLastName,
    getProfileAvatarUrl,
    getProfileCreatedAt
} from './getProfile';
import type { ProfileSchema } from '../types/profile';

const mockProfile = {
    id: '1',
    firstName: 'Азамат',
    lastName: 'Каримов',
    avatarUrl: 'https://example.com/avatar.png',
    createdAt: '2023-01-01'
};

const makeState = (overrides: Partial<ProfileSchema> = {}) => ({
    profile: { isLoading: false, data: mockProfile, ...overrides }
});

describe('profileSelectors', () => {
    describe('getProfileData', () => {
        it('returns profile data', () => {
            expect(getProfileData(makeState())).toEqual(mockProfile);
        });

        it('returns undefined when no data', () => {
            expect(getProfileData(makeState({ data: undefined }))).toBeUndefined();
        });
    });

    describe('getProfileIsLoading', () => {
        it('returns true when loading', () => {
            expect(getProfileIsLoading(makeState({ isLoading: true }))).toBe(true);
        });

        it('returns false as default when slice absent', () => {
            expect(getProfileIsLoading({})).toBe(false);
        });
    });

    describe('getProfileError', () => {
        it('returns error string', () => {
            expect(getProfileError(makeState({ error: 'fail' }))).toBe('fail');
        });

        it('returns undefined when no error', () => {
            expect(getProfileError(makeState())).toBeUndefined();
        });
    });

    describe('field selectors', () => {
        it('getProfileFirstName returns firstName', () => {
            expect(getProfileFirstName(makeState())).toBe('Азамат');
        });

        it('getProfileFirstName returns "" when no data', () => {
            expect(getProfileFirstName(makeState({ data: undefined }))).toBe('');
        });

        it('getProfileLastName returns lastName', () => {
            expect(getProfileLastName(makeState())).toBe('Каримов');
        });

        it('getProfileLastName returns "" when no data', () => {
            expect(getProfileLastName(makeState({ data: undefined }))).toBe('');
        });

        it('getProfileAvatarUrl returns avatarUrl', () => {
            expect(getProfileAvatarUrl(makeState())).toBe('https://example.com/avatar.png');
        });

        it('getProfileAvatarUrl returns "" when no data', () => {
            expect(getProfileAvatarUrl(makeState({ data: undefined }))).toBe('');
        });

        it('getProfileCreatedAt returns createdAt', () => {
            expect(getProfileCreatedAt(makeState())).toBe('2023-01-01');
        });

        it('getProfileCreatedAt returns "" when no data', () => {
            expect(getProfileCreatedAt(makeState({ data: undefined }))).toBe('');
        });
    });
});
