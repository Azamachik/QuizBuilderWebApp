import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { toggleQuizStatus } from './toggleQuizStatus';
import { quizReducer } from '../../slice/quizSlice';
import type { Quiz } from '../../types/Quiz';

const draft: Quiz = {
    id: 'q1',
    title: 'Test',
    authorId: 'user1',
    isPublished: false,
    createdAt: '2024-01-01',
    attemptsCount: 0,
    questionsCount: 2
};

const published: Quiz = { ...draft, isPublished: true };

const makeStore = (api: object, preloadedQuizzes: Quiz[] = [], currentQuiz?: Quiz) =>
    configureStore({
        reducer: { quizzes: quizReducer },
        preloadedState: {
            quizzes: { quizzes: preloadedQuizzes, isLoading: false, currentQuizIsLoading: false, currentQuiz }
        },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

describe('toggleQuizStatus', () => {
    it('fulfilled — PATCHes /quizzes/{id} with inverted isPublished', async () => {
        const api = { patch: vi.fn().mockResolvedValue({ data: published }) };
        const store = makeStore(api, [draft]);

        await store.dispatch(toggleQuizStatus({ id: 'q1', isPublished: false }) as ReturnType<typeof toggleQuizStatus>);

        expect(api.patch).toHaveBeenCalledWith('/quizzes/q1', { isPublished: true });
    });

    it('fulfilled — updates quiz in the list', async () => {
        const api = { patch: vi.fn().mockResolvedValue({ data: published }) };
        const store = makeStore(api, [draft]);

        await store.dispatch(toggleQuizStatus({ id: 'q1', isPublished: false }) as ReturnType<typeof toggleQuizStatus>);

        expect(store.getState().quizzes.quizzes[0].isPublished).toBe(true);
    });

    it('fulfilled — publishes → draft when isPublished=true is passed', async () => {
        const api = { patch: vi.fn().mockResolvedValue({ data: draft }) };
        const store = makeStore(api, [published]);

        await store.dispatch(toggleQuizStatus({ id: 'q1', isPublished: true }) as ReturnType<typeof toggleQuizStatus>);

        expect(api.patch).toHaveBeenCalledWith('/quizzes/q1', { isPublished: false });
    });

    it('fulfilled — also updates currentQuiz when id matches', async () => {
        const api = { patch: vi.fn().mockResolvedValue({ data: published }) };
        const store = makeStore(api, [draft], draft);

        await store.dispatch(toggleQuizStatus({ id: 'q1', isPublished: false }) as ReturnType<typeof toggleQuizStatus>);

        expect(store.getState().quizzes.currentQuiz?.isPublished).toBe(true);
    });

    it('rejected — action payload contains the error message', async () => {
        const api = { patch: vi.fn().mockRejectedValue(new Error('fail')) };
        const store = makeStore(api, [draft]);

        const result = await store.dispatch(toggleQuizStatus({ id: 'q1', isPublished: false }) as ReturnType<typeof toggleQuizStatus>);

        expect(toggleQuizStatus.rejected.match(result)).toBe(true);
        expect((result as ReturnType<typeof toggleQuizStatus.rejected>).payload).toBe('Ошибка смены статуса');
    });
});
