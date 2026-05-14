import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { fetchQuizzes } from './fetchQuizzes';
import { quizReducer } from '../../slice/quizSlice';
import type { Quiz } from '../../types/Quiz';

const makeStore = (api: object) =>
    configureStore({
        reducer: { quizzes: quizReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const mockQuizzes: Quiz[] = [
    { id: '1', title: 'Quiz 1', authorId: 'u1', isPublished: true, createdAt: '2024-01-01', attemptsCount: 0, questionsCount: 0 }
];

describe('fetchQuizzes', () => {
    it('fulfilled — stores quizzes and calls correct endpoint', async () => {
        const api = { get: vi.fn().mockResolvedValue({ data: mockQuizzes }) };
        const store = makeStore(api);

        await store.dispatch(fetchQuizzes('user1') as ReturnType<typeof fetchQuizzes>);

        expect(api.get).toHaveBeenCalledWith('/quizzes', { params: { authorId: 'user1' } });
        expect(store.getState().quizzes.quizzes).toEqual(mockQuizzes);
        expect(store.getState().quizzes.isLoading).toBe(false);
    });

    it('rejected — sets error message on API failure', async () => {
        const api = { get: vi.fn().mockRejectedValue(new Error('Network error')) };
        const store = makeStore(api);

        await store.dispatch(fetchQuizzes('user1') as ReturnType<typeof fetchQuizzes>);

        expect(store.getState().quizzes.error).toBe('Ошибка загрузки тестов');
        expect(store.getState().quizzes.isLoading).toBe(false);
        expect(store.getState().quizzes.quizzes).toEqual([]);
    });
});
