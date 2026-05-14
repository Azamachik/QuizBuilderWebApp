import { describe, it, expect } from 'vitest';
import { attemptReducer, setSessionQuestions } from './attemptSlice';
import { submitAttempt } from '../services/submitAttempt/submitAttempt';
import { fetchAttemptById } from '../services/fetchAttemptById/fetchAttemptById';
import type { AttemptSchema } from '../types/AttemptSchema';
import type { Attempt } from '../types/Attempt';
import type { Question } from '@/entities/Question';

const mockAttempt: Attempt = {
    id: 'a1',
    quizId: 'quiz1',
    quizTitle: 'Test Quiz',
    inviteLinkToken: 'tok',
    label: 'General',
    answers: [],
    score: 2,
    total: 3,
    createdAt: '2024-01-01T00:00:00.000Z'
};

const mockQuestions: Question[] = [{ id: 'q1', quizId: 'quiz1', order: 1, text: 'Q1', type: 'single', options: [], required: true }];

const initialState: AttemptSchema = {
    isLoading: false,
    isSubmitting: false
};

describe('attemptSlice', () => {
    it('returns initial state', () => {
        expect(attemptReducer(undefined, { type: '' })).toEqual(initialState);
    });

    describe('setSessionQuestions', () => {
        it('stores session questions', () => {
            const state = attemptReducer(initialState, setSessionQuestions(mockQuestions));
            expect(state.sessionQuestions).toEqual(mockQuestions);
        });
    });

    describe('submitAttempt', () => {
        it('pending — sets isSubmitting, clears error', () => {
            const state = attemptReducer({ ...initialState, error: 'old' }, submitAttempt.pending('', {} as never));
            expect(state.isSubmitting).toBe(true);
            expect(state.error).toBeUndefined();
        });

        it('fulfilled — clears isSubmitting, stores currentAttempt', () => {
            const state = attemptReducer({ ...initialState, isSubmitting: true }, submitAttempt.fulfilled(mockAttempt, '', {} as never));
            expect(state.isSubmitting).toBe(false);
            expect(state.currentAttempt).toEqual(mockAttempt);
        });

        it('rejected — clears isSubmitting, stores error', () => {
            const state = attemptReducer(
                { ...initialState, isSubmitting: true },
                submitAttempt.rejected(null, '', {} as never, 'Ошибка отправки результатов')
            );
            expect(state.isSubmitting).toBe(false);
            expect(state.error).toBe('Ошибка отправки результатов');
        });
    });

    describe('fetchAttemptById', () => {
        it('pending — sets isLoading, clears error', () => {
            const state = attemptReducer({ ...initialState, error: 'old' }, fetchAttemptById.pending('', ''));
            expect(state.isLoading).toBe(true);
            expect(state.error).toBeUndefined();
        });

        it('fulfilled — clears isLoading, stores currentAttempt', () => {
            const state = attemptReducer({ ...initialState, isLoading: true }, fetchAttemptById.fulfilled(mockAttempt, '', ''));
            expect(state.isLoading).toBe(false);
            expect(state.currentAttempt).toEqual(mockAttempt);
        });

        it('rejected — clears isLoading, stores error', () => {
            const state = attemptReducer({ ...initialState, isLoading: true }, fetchAttemptById.rejected(null, '', '', 'Ошибка'));
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe('Ошибка');
        });
    });
});
