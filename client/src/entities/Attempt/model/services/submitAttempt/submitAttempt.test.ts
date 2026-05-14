import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { submitAttempt } from './submitAttempt';
import { attemptReducer } from '../../slice/attemptSlice';
import type { AttemptCreate, Attempt } from '../../types/Attempt';

const makeStore = (api: object) =>
    configureStore({
        reducer: { attempt: attemptReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const payload: AttemptCreate = {
    quizId: 'quiz1',
    quizTitle: 'Test Quiz',
    inviteLinkToken: 'tok123',
    label: 'General',
    answers: [{ questionId: 'q1', selectedOptionIds: ['o1'] }],
    score: 1,
    total: 1
};

const mockAttempt: Attempt = {
    ...payload,
    id: 'a1',
    createdAt: '2024-01-01T00:00:00.000Z'
};

describe('submitAttempt', () => {
    it('fulfilled — posts to correct endpoint and stores currentAttempt', async () => {
        const api = { post: vi.fn().mockResolvedValue({ data: mockAttempt }) };
        const store = makeStore(api);

        await store.dispatch(submitAttempt(payload) as ReturnType<typeof submitAttempt>);

        expect(api.post).toHaveBeenCalledWith('/public/attempts', payload);
        expect(store.getState().attempt.currentAttempt).toEqual(mockAttempt);
        expect(store.getState().attempt.isSubmitting).toBe(false);
    });

    it('rejected — sets error message on API failure', async () => {
        const api = { post: vi.fn().mockRejectedValue(new Error('fail')) };
        const store = makeStore(api);

        await store.dispatch(submitAttempt(payload) as ReturnType<typeof submitAttempt>);

        expect(store.getState().attempt.error).toBe('Ошибка отправки результатов');
        expect(store.getState().attempt.isSubmitting).toBe(false);
    });

    it('sets isSubmitting=true while in flight', async () => {
        let resolveApi!: (v: unknown) => void;
        const api = {
            post: vi.fn().mockReturnValue(
                new Promise((res) => {
                    resolveApi = res;
                })
            )
        };
        const store = makeStore(api);

        const dispatch = store.dispatch(submitAttempt(payload) as ReturnType<typeof submitAttempt>);
        expect(store.getState().attempt.isSubmitting).toBe(true);

        resolveApi({ data: mockAttempt });
        await dispatch;
        expect(store.getState().attempt.isSubmitting).toBe(false);
    });
});
