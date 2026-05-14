import { describe, it, expect } from 'vitest';
import { getQuestions, getQuestionsIsLoading, getQuestionsIsSaving, getQuestionsError } from './questionSelectors';
import type { StateSchema } from '@/app/providers/StoreProvider';

const makeState = (overrides: Partial<StateSchema['questions']> = {}): Pick<StateSchema, 'questions'> => ({
    questions: {
        questions: [],
        formData: [{ id: 'q1', quizId: 'quiz1', order: 1, text: 'Q1', type: 'single', options: [], required: true }],
        isLoading: false,
        isSaving: false,
        ...overrides
    }
});

describe('questionSelectors', () => {
    describe('getQuestions', () => {
        it('returns formData', () => {
            expect(getQuestions(makeState() as StateSchema)).toHaveLength(1);
        });

        it('returns [] when slice is absent', () => {
            expect(getQuestions({} as StateSchema)).toEqual([]);
        });
    });

    describe('getQuestionsIsLoading', () => {
        it('returns true when loading', () => {
            expect(getQuestionsIsLoading(makeState({ isLoading: true }) as StateSchema)).toBe(true);
        });

        it('returns false as default when absent', () => {
            expect(getQuestionsIsLoading({} as StateSchema)).toBe(false);
        });
    });

    describe('getQuestionsIsSaving', () => {
        it('returns true when saving', () => {
            expect(getQuestionsIsSaving(makeState({ isSaving: true }) as StateSchema)).toBe(true);
        });

        it('returns false as default when absent', () => {
            expect(getQuestionsIsSaving({} as StateSchema)).toBe(false);
        });
    });

    describe('getQuestionsError', () => {
        it('returns error string', () => {
            expect(getQuestionsError(makeState({ error: 'err' }) as StateSchema)).toBe('err');
        });

        it('returns undefined when no error', () => {
            expect(getQuestionsError(makeState() as StateSchema)).toBeUndefined();
        });
    });
});
