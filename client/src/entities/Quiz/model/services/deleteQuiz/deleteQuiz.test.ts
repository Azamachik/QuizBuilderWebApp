import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { deleteQuiz } from './deleteQuiz';
import { quizReducer } from '../../slice/quizSlice';
import type { Quiz } from '../../types/Quiz';

const makeStore = (api: object, preloadedQuizzes: Quiz[] = []) =>
    configureStore({
        reducer: { quizzes: quizReducer },
        preloadedState: { quizzes: { quizzes: preloadedQuizzes, isLoading: false, currentQuizIsLoading: false } },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const mockQuiz: Quiz = {
    id: 'q1',
    title: 'Test',
    authorId: 'user1',
    isPublished: false,
    createdAt: '2024-01-01',
    attemptsCount: 0,
    questionsCount: 0
};

describe('deleteQuiz', () => {
    it('fulfilled — calls DELETE /quizzes/{id}', async () => {
        const api = { delete: vi.fn().mockResolvedValue({}) };
        const store = makeStore(api, [mockQuiz]);

        await store.dispatch(deleteQuiz('q1') as ReturnType<typeof deleteQuiz>);

        expect(api.delete).toHaveBeenCalledWith('/quizzes/q1');
    });

    it('fulfilled — removes quiz from the list', async () => {
        const api = { delete: vi.fn().mockResolvedValue({}) };
        const store = makeStore(api, [mockQuiz]);

        await store.dispatch(deleteQuiz('q1') as ReturnType<typeof deleteQuiz>);

        expect(store.getState().quizzes.quizzes).toHaveLength(0);
    });

    it('fulfilled — does not remove other quizzes', async () => {
        const other: Quiz = { ...mockQuiz, id: 'q2', title: 'Other' };
        const api = { delete: vi.fn().mockResolvedValue({}) };
        const store = makeStore(api, [mockQuiz, other]);

        await store.dispatch(deleteQuiz('q1') as ReturnType<typeof deleteQuiz>);

        expect(store.getState().quizzes.quizzes).toHaveLength(1);
        expect(store.getState().quizzes.quizzes[0].id).toBe('q2');
    });

    it('rejected — returns "Ошибка удаления теста" as the action payload', async () => {
        const api = { delete: vi.fn().mockRejectedValue(new Error('fail')) };
        const store = makeStore(api, [mockQuiz]);

        const result = await store.dispatch(deleteQuiz('q1') as ReturnType<typeof deleteQuiz>);

        expect(deleteQuiz.rejected.match(result)).toBe(true);
        expect((result as ReturnType<typeof deleteQuiz.rejected>).payload).toBe('Ошибка удаления теста');
        expect(store.getState().quizzes.quizzes).toHaveLength(1);
    });
});
