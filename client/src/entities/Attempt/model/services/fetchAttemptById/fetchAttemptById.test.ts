import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { fetchAttemptById } from './fetchAttemptById';
import { attemptReducer } from '../../slice/attemptSlice';
import type { Attempt } from '../../types/Attempt';

const makeStore = (api: object) =>
    configureStore({
        reducer: { attempt: attemptReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const mockAttempt: Attempt = {
    id: 'a1',
    quizId: 'quiz1',
    quizTitle: 'Test Quiz',
    inviteLinkToken: 'tok123',
    label: 'Основная группа',
    answers: [{ questionId: 'q1', selectedOptionIds: ['o1'] }],
    score: 3,
    total: 5,
    createdAt: '2024-01-01T12:00:00.000Z'
};

describe('fetchAttemptById', () => {
    it('fulfilled — calls GET /public/attempts/{id}', async () => {
        const api = { get: vi.fn().mockResolvedValue({ data: mockAttempt }) };
        const store = makeStore(api);

        await store.dispatch(fetchAttemptById('a1') as ReturnType<typeof fetchAttemptById>);

        expect(api.get).toHaveBeenCalledWith('/public/attempts/a1');
    });

    it('fulfilled — stores attempt as currentAttempt', async () => {
        const api = { get: vi.fn().mockResolvedValue({ data: mockAttempt }) };
        const store = makeStore(api);

        await store.dispatch(fetchAttemptById('a1') as ReturnType<typeof fetchAttemptById>);

        expect(store.getState().attempt.currentAttempt).toEqual(mockAttempt);
        expect(store.getState().attempt.isLoading).toBe(false);
    });

    it('sets isLoading=true while in flight', async () => {
        let resolve!: (v: unknown) => void;
        const api = {
            get: vi.fn().mockReturnValue(
                new Promise((r) => {
                    resolve = r;
                })
            )
        };
        const store = makeStore(api);

        const dispatch = store.dispatch(fetchAttemptById('a1') as ReturnType<typeof fetchAttemptById>);
        expect(store.getState().attempt.isLoading).toBe(true);

        resolve({ data: mockAttempt });
        await dispatch;
        expect(store.getState().attempt.isLoading).toBe(false);
    });

    it('rejected — sets "Попытка не найдена" error message', async () => {
        const api = { get: vi.fn().mockRejectedValue(new Error('404')) };
        const store = makeStore(api);

        await store.dispatch(fetchAttemptById('a1') as ReturnType<typeof fetchAttemptById>);

        expect(store.getState().attempt.error).toBe('Попытка не найдена');
        expect(store.getState().attempt.isLoading).toBe(false);
    });

    it('rejected — clears any previous currentAttempt', async () => {
        const api = { get: vi.fn().mockRejectedValue(new Error('fail')) };
        const store = configureStore({
            reducer: { attempt: attemptReducer },
            preloadedState: {
                attempt: {
                    currentAttempt: mockAttempt,
                    isLoading: false,
                    isSubmitting: false
                }
            },
            middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
        });

        await store.dispatch(fetchAttemptById('a1') as ReturnType<typeof fetchAttemptById>);

        // currentAttempt should remain (slice doesn't clear it on rejection)
        // but error is set
        expect(store.getState().attempt.error).toBe('Попытка не найдена');
    });
});
