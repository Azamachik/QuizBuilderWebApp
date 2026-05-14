import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { updateQuiz } from './updateQuiz';
import { quizReducer } from '../../slice/quizSlice';
import type { Quiz } from '../../types/Quiz';

const original: Quiz = {
    id: 'q1',
    title: 'Старый заголовок',
    authorId: 'user1',
    isPublished: false,
    createdAt: '2024-01-01',
    attemptsCount: 0,
    questionsCount: 3
};

const updated: Quiz = { ...original, title: 'Новый заголовок', description: 'Добавлено описание' };

const makeStore = (api: object, preloadedQuizzes: Quiz[] = [], currentQuiz?: Quiz) =>
    configureStore({
        reducer: { quizzes: quizReducer },
        preloadedState: {
            quizzes: { quizzes: preloadedQuizzes, isLoading: false, currentQuizIsLoading: false, currentQuiz }
        },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

describe('updateQuiz', () => {
    it('fulfilled — PATCHes /quizzes/{id} with the provided data', async () => {
        const api = { patch: vi.fn().mockResolvedValue({ data: updated }) };
        const store = makeStore(api, [original]);

        await store.dispatch(
            updateQuiz({ id: 'q1', data: { title: 'Новый заголовок', description: 'Добавлено описание' } }) as ReturnType<typeof updateQuiz>
        );

        expect(api.patch).toHaveBeenCalledWith('/quizzes/q1', {
            title: 'Новый заголовок',
            description: 'Добавлено описание'
        });
    });

    it('fulfilled — replaces quiz in the list', async () => {
        const api = { patch: vi.fn().mockResolvedValue({ data: updated }) };
        const store = makeStore(api, [original]);

        await store.dispatch(updateQuiz({ id: 'q1', data: { title: 'Новый заголовок' } }) as ReturnType<typeof updateQuiz>);

        expect(store.getState().quizzes.quizzes[0].title).toBe('Новый заголовок');
    });

    it('fulfilled — also updates currentQuiz when id matches', async () => {
        const api = { patch: vi.fn().mockResolvedValue({ data: updated }) };
        const store = makeStore(api, [original], original);

        await store.dispatch(updateQuiz({ id: 'q1', data: { title: 'Новый заголовок' } }) as ReturnType<typeof updateQuiz>);

        expect(store.getState().quizzes.currentQuiz?.title).toBe('Новый заголовок');
    });

    it('fulfilled — does not change currentQuiz when ids differ', async () => {
        const otherQuiz: Quiz = { ...original, id: 'q99' };
        const api = { patch: vi.fn().mockResolvedValue({ data: updated }) };
        const store = makeStore(api, [original], otherQuiz);

        await store.dispatch(updateQuiz({ id: 'q1', data: { title: 'Новый заголовок' } }) as ReturnType<typeof updateQuiz>);

        expect(store.getState().quizzes.currentQuiz?.id).toBe('q99');
    });

    it('rejected — action payload contains the error message', async () => {
        const api = { patch: vi.fn().mockRejectedValue(new Error('fail')) };
        const store = makeStore(api, [original]);

        const result = await store.dispatch(updateQuiz({ id: 'q1', data: { title: 'X' } }) as ReturnType<typeof updateQuiz>);

        expect(updateQuiz.rejected.match(result)).toBe(true);
        expect((result as ReturnType<typeof updateQuiz.rejected>).payload).toBe('Ошибка обновления теста');
    });
});
