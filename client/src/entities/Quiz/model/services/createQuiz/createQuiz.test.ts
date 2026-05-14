import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { createQuiz } from './createQuiz';
import { quizReducer } from '../../slice/quizSlice';
import type { Quiz } from '../../types/Quiz';

const makeStore = (api: object) =>
    configureStore({
        reducer: { quizzes: quizReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const payload = { title: 'Новый тест', description: 'Описание', authorId: 'user1' };

const mockQuiz: Quiz = {
    id: 'q1',
    title: 'Новый тест',
    description: 'Описание',
    authorId: 'user1',
    isPublished: false,
    attemptsCount: 0,
    questionsCount: 0,
    createdAt: '2024-01-01T00:00:00.000Z'
};

describe('createQuiz', () => {
    it('fulfilled — POSTs to /quizzes and appends quiz to list', async () => {
        const api = { post: vi.fn().mockResolvedValue({ data: mockQuiz }) };
        const store = makeStore(api);

        await store.dispatch(createQuiz(payload) as ReturnType<typeof createQuiz>);

        expect(api.post).toHaveBeenCalledWith('/quizzes', expect.objectContaining(payload));
        expect(store.getState().quizzes.quizzes).toHaveLength(1);
        expect(store.getState().quizzes.quizzes[0]).toEqual(mockQuiz);
    });

    it('POST body includes isPublished=false and attemptsCount=0', async () => {
        const api = { post: vi.fn().mockResolvedValue({ data: mockQuiz }) };
        const store = makeStore(api);

        await store.dispatch(createQuiz(payload) as ReturnType<typeof createQuiz>);

        expect(api.post).toHaveBeenCalledWith('/quizzes', expect.objectContaining({ isPublished: false, attemptsCount: 0 }));
    });

    it('POST body includes a createdAt ISO string', async () => {
        const api = { post: vi.fn().mockResolvedValue({ data: mockQuiz }) };
        const store = makeStore(api);

        await store.dispatch(createQuiz(payload) as ReturnType<typeof createQuiz>);

        const body = api.post.mock.calls[0][1] as Record<string, unknown>;
        expect(typeof body.createdAt).toBe('string');
        expect(new Date(body.createdAt as string).toString()).not.toBe('Invalid Date');
    });

    it('rejected — returns "Ошибка создания теста" as the action payload', async () => {
        const api = { post: vi.fn().mockRejectedValue(new Error('fail')) };
        const store = makeStore(api);

        const result = await store.dispatch(createQuiz(payload) as ReturnType<typeof createQuiz>);

        expect(createQuiz.rejected.match(result)).toBe(true);
        expect((result as ReturnType<typeof createQuiz.rejected>).payload).toBe('Ошибка создания теста');
        expect(store.getState().quizzes.quizzes).toHaveLength(0);
    });

    it('works without optional description field', async () => {
        const api = { post: vi.fn().mockResolvedValue({ data: { ...mockQuiz, description: undefined } }) };
        const store = makeStore(api);

        await store.dispatch(createQuiz({ title: 'Без описания', authorId: 'user1' }) as ReturnType<typeof createQuiz>);

        expect(api.post).toHaveBeenCalledWith('/quizzes', expect.objectContaining({ title: 'Без описания' }));
    });
});
