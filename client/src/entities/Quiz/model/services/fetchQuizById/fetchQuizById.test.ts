import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { fetchQuizById } from './fetchQuizById';
import { quizReducer } from '../../slice/quizSlice';
import type { Quiz } from '../../types/Quiz';

const makeStore = (api: object) =>
    configureStore({
        reducer: { quizzes: quizReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const mockQuiz: Quiz = {
    id: 'q1',
    title: 'Test Quiz',
    authorId: 'user1',
    isPublished: true,
    createdAt: '2024-01-01',
    attemptsCount: 5,
    questionsCount: 3
};

describe('fetchQuizById', () => {
    it('fulfilled — calls GET /quizzes/{id}', async () => {
        const api = { get: vi.fn().mockResolvedValue({ data: mockQuiz }) };
        const store = makeStore(api);

        await store.dispatch(fetchQuizById('q1') as ReturnType<typeof fetchQuizById>);

        expect(api.get).toHaveBeenCalledWith('/quizzes/q1');
    });

    it('fulfilled — stores quiz as currentQuiz', async () => {
        const api = { get: vi.fn().mockResolvedValue({ data: mockQuiz }) };
        const store = makeStore(api);

        await store.dispatch(fetchQuizById('q1') as ReturnType<typeof fetchQuizById>);

        expect(store.getState().quizzes.currentQuiz).toEqual(mockQuiz);
        expect(store.getState().quizzes.currentQuizIsLoading).toBe(false);
    });

    it('sets currentQuizIsLoading=true while in flight', async () => {
        let resolve!: (v: unknown) => void;
        const api = {
            get: vi.fn().mockReturnValue(
                new Promise((r) => {
                    resolve = r;
                })
            )
        };
        const store = makeStore(api);

        const dispatch = store.dispatch(fetchQuizById('q1') as ReturnType<typeof fetchQuizById>);
        expect(store.getState().quizzes.currentQuizIsLoading).toBe(true);

        resolve({ data: mockQuiz });
        await dispatch;
        expect(store.getState().quizzes.currentQuizIsLoading).toBe(false);
    });

    it('rejected — clears currentQuizIsLoading', async () => {
        const api = { get: vi.fn().mockRejectedValue(new Error('not found')) };
        const store = makeStore(api);

        await store.dispatch(fetchQuizById('q1') as ReturnType<typeof fetchQuizById>);

        expect(store.getState().quizzes.currentQuizIsLoading).toBe(false);
    });

    it('rejected — action payload contains the error message', async () => {
        const api = { get: vi.fn().mockRejectedValue(new Error('not found')) };
        const store = makeStore(api);

        const result = await store.dispatch(fetchQuizById('q1') as ReturnType<typeof fetchQuizById>);

        expect(fetchQuizById.rejected.match(result)).toBe(true);
        expect((result as ReturnType<typeof fetchQuizById.rejected>).payload).toBe('Ошибка загрузки теста');
    });
});
