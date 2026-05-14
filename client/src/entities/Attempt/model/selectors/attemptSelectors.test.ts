import { describe, it, expect } from 'vitest';
import {
    getCurrentAttempt,
    getAttemptIsLoading,
    getAttemptIsSubmitting,
    getAttemptError,
    getAttemptSessionQuestions
} from './attemptSelectors';
import type { StateSchema } from '@/app/providers/StoreProvider';

const makeState = (overrides: Partial<StateSchema['attempt']> = {}): Pick<StateSchema, 'attempt'> => ({
    attempt: {
        isLoading: false,
        isSubmitting: false,
        ...overrides
    }
});

const mockAttempt = {
    id: 'a1',
    quizId: 'q1',
    quizTitle: 'Test',
    inviteLinkToken: 'tok',
    label: 'General',
    answers: [],
    score: 1,
    total: 2,
    createdAt: '2024-01-01'
};

describe('attemptSelectors', () => {
    describe('getCurrentAttempt', () => {
        it('returns currentAttempt when set', () => {
            const state = makeState({ currentAttempt: mockAttempt });
            expect(getCurrentAttempt(state as StateSchema)).toEqual(mockAttempt);
        });

        it('returns undefined when not set', () => {
            expect(getCurrentAttempt(makeState() as StateSchema)).toBeUndefined();
        });
    });

    describe('getAttemptIsLoading', () => {
        it('returns true when loading', () => {
            expect(getAttemptIsLoading(makeState({ isLoading: true }) as StateSchema)).toBe(true);
        });

        it('returns false as default when absent', () => {
            expect(getAttemptIsLoading({} as StateSchema)).toBe(false);
        });
    });

    describe('getAttemptIsSubmitting', () => {
        it('returns true when submitting', () => {
            expect(getAttemptIsSubmitting(makeState({ isSubmitting: true }) as StateSchema)).toBe(true);
        });

        it('returns false as default when absent', () => {
            expect(getAttemptIsSubmitting({} as StateSchema)).toBe(false);
        });
    });

    describe('getAttemptError', () => {
        it('returns error string', () => {
            expect(getAttemptError(makeState({ error: 'fail' }) as StateSchema)).toBe('fail');
        });

        it('returns undefined when no error', () => {
            expect(getAttemptError(makeState() as StateSchema)).toBeUndefined();
        });
    });

    describe('getAttemptSessionQuestions', () => {
        it('returns sessionQuestions when set', () => {
            const questions = [{ id: 'q1', quizId: 'quiz1', order: 1, text: 'Q', type: 'text' as const, options: [], required: false }];
            expect(getAttemptSessionQuestions(makeState({ sessionQuestions: questions }) as StateSchema)).toEqual(questions);
        });

        it('returns [] as default when absent', () => {
            expect(getAttemptSessionQuestions({} as StateSchema)).toEqual([]);
        });
    });
});
