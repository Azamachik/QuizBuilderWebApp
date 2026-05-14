import { describe, it, expect } from 'vitest';
import { getTakingSession, getTakingSessionIsLoading, getTakingSessionError } from './inviteLinkSelectors';
import type { StateSchema } from '@/app/providers/StoreProvider';

const mockSession = {
    inviteLink: {
        id: 'il1',
        quizId: 'q1',
        token: 'tok',
        label: 'Link',
        maxUses: null,
        usedCount: 0,
        expiresAt: null,
        isActive: true,
        createdAt: '2024-01-01',
        createdBy: 'u1'
    },
    quiz: { id: 'q1', title: 'Quiz', description: '' },
    questions: []
};

const makeState = (overrides: Partial<StateSchema['inviteLink']> = {}): Pick<StateSchema, 'inviteLink'> => ({
    inviteLink: { isLoading: false, ...overrides }
});

describe('inviteLinkSelectors', () => {
    describe('getTakingSession', () => {
        it('returns session when set', () => {
            expect(getTakingSession(makeState({ session: mockSession }) as StateSchema)).toEqual(mockSession);
        });

        it('returns undefined when not set', () => {
            expect(getTakingSession(makeState() as StateSchema)).toBeUndefined();
        });

        it('returns undefined when slice is absent', () => {
            expect(getTakingSession({} as StateSchema)).toBeUndefined();
        });
    });

    describe('getTakingSessionIsLoading', () => {
        it('returns true when loading', () => {
            expect(getTakingSessionIsLoading(makeState({ isLoading: true }) as StateSchema)).toBe(true);
        });

        it('returns false when not loading', () => {
            expect(getTakingSessionIsLoading(makeState() as StateSchema)).toBe(false);
        });

        it('returns false as default when slice is absent', () => {
            expect(getTakingSessionIsLoading({} as StateSchema)).toBe(false);
        });
    });

    describe('getTakingSessionError', () => {
        it('returns error string', () => {
            const msg = 'Ссылка недействительна';
            expect(getTakingSessionError(makeState({ error: msg }) as StateSchema)).toBe(msg);
        });

        it('returns undefined when no error', () => {
            expect(getTakingSessionError(makeState() as StateSchema)).toBeUndefined();
        });
    });
});
