import { describe, it, expect } from 'vitest';
import {
    getQuizzes,
    getQuizzesIsLoading,
    getQuizzesError,
    getCurrentQuiz,
    getCurrentQuizIsLoading,
    getProfileStats,
    getQuizzesCreatedDates
} from './quizSelectors';
import type { StateSchema } from '@/app/providers/StoreProvider';

const makeState = (overrides: Partial<StateSchema['quizzes']> = {}): Pick<StateSchema, 'quizzes'> => ({
    quizzes: {
        quizzes: [
            { id: '1', title: 'Q1', authorId: 'u1', isPublished: true, createdAt: '2024-01-01', attemptsCount: 10, questionsCount: 3 },
            { id: '2', title: 'Q2', authorId: 'u1', isPublished: false, createdAt: '2024-02-01', attemptsCount: 5, questionsCount: 2 }
        ],
        isLoading: false,
        currentQuizIsLoading: false,
        ...overrides
    }
});

describe('quizSelectors', () => {
    describe('getQuizzes', () => {
        it('returns the quizzes array', () => {
            expect(getQuizzes(makeState() as StateSchema)).toHaveLength(2);
        });

        it('returns [] when quizzes slice is absent', () => {
            expect(getQuizzes({} as StateSchema)).toEqual([]);
        });
    });

    describe('getQuizzesIsLoading', () => {
        it('returns true when loading', () => {
            expect(getQuizzesIsLoading(makeState({ isLoading: true }) as StateSchema)).toBe(true);
        });

        it('returns false as default when slice is absent', () => {
            expect(getQuizzesIsLoading({} as StateSchema)).toBe(false);
        });
    });

    describe('getQuizzesError', () => {
        it('returns error string', () => {
            expect(getQuizzesError(makeState({ error: 'fail' }) as StateSchema)).toBe('fail');
        });

        it('returns undefined when no error', () => {
            expect(getQuizzesError(makeState() as StateSchema)).toBeUndefined();
        });
    });

    describe('getCurrentQuiz', () => {
        it('returns currentQuiz', () => {
            const quiz = makeState().quizzes!.quizzes[0];
            expect(getCurrentQuiz(makeState({ currentQuiz: quiz }) as StateSchema)).toEqual(quiz);
        });

        it('returns undefined when not set', () => {
            expect(getCurrentQuiz(makeState() as StateSchema)).toBeUndefined();
        });
    });

    describe('getCurrentQuizIsLoading', () => {
        it('returns true when loading', () => {
            expect(getCurrentQuizIsLoading(makeState({ currentQuizIsLoading: true }) as StateSchema)).toBe(true);
        });

        it('returns false as default', () => {
            expect(getCurrentQuizIsLoading({} as StateSchema)).toBe(false);
        });
    });

    describe('getProfileStats', () => {
        it('calculates created, published, drafts, attempts correctly', () => {
            const stats = getProfileStats(makeState() as StateSchema);
            expect(stats.created).toBe(2);
            expect(stats.published).toBe(1);
            expect(stats.drafts).toBe(1);
            expect(stats.attempts).toBe(15);
        });

        it('returns zeros when no quizzes', () => {
            const state = makeState({ quizzes: [] });
            expect(getProfileStats(state as StateSchema)).toEqual({
                created: 0,
                published: 0,
                drafts: 0,
                attempts: 0
            });
        });

        it('returns zeros when slice is absent', () => {
            expect(getProfileStats({} as StateSchema)).toEqual({
                created: 0,
                published: 0,
                drafts: 0,
                attempts: 0
            });
        });
    });

    describe('getQuizzesCreatedDates', () => {
        it('returns array of createdAt strings', () => {
            expect(getQuizzesCreatedDates(makeState() as StateSchema)).toEqual(['2024-01-01', '2024-02-01']);
        });

        it('returns [] when slice is absent', () => {
            expect(getQuizzesCreatedDates({} as StateSchema)).toEqual([]);
        });
    });
});
