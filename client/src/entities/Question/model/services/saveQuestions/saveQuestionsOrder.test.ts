import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { saveQuestionsOrder } from './saveQuestionsOrder';
import { questionReducer } from '../../slice/questionSlice';
import type { Question } from '../../types/Question';

const makeStore = (api: object) =>
    configureStore({
        reducer: { questions: questionReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const makeQ = (id: string, order: number): Question => ({
    id,
    quizId: 'quiz1',
    order,
    text: `Q${id}`,
    type: 'single',
    options: [],
    required: false
});

describe('saveQuestionsOrder', () => {
    it('PATCHes each question with its new order', async () => {
        const q1 = makeQ('q1', 1);
        const q2 = makeQ('q2', 2);
        const api = { patch: vi.fn().mockResolvedValue({}) };
        const store = makeStore(api);

        await store.dispatch(saveQuestionsOrder([q1, q2]) as ReturnType<typeof saveQuestionsOrder>);

        expect(api.patch).toHaveBeenCalledTimes(2);
        expect(api.patch).toHaveBeenCalledWith('/questions/q1', { order: 1 });
        expect(api.patch).toHaveBeenCalledWith('/questions/q2', { order: 2 });
    });

    it('calls PATCH for all questions in the array', async () => {
        const questions = [makeQ('a', 1), makeQ('b', 2), makeQ('c', 3)];
        const api = { patch: vi.fn().mockResolvedValue({}) };
        const store = makeStore(api);

        await store.dispatch(saveQuestionsOrder(questions) as ReturnType<typeof saveQuestionsOrder>);

        expect(api.patch).toHaveBeenCalledTimes(3);
    });

    it('sends only the order field in each PATCH body', async () => {
        const q = makeQ('q1', 5);
        const api = { patch: vi.fn().mockResolvedValue({}) };
        const store = makeStore(api);

        await store.dispatch(saveQuestionsOrder([q]) as ReturnType<typeof saveQuestionsOrder>);

        expect(api.patch).toHaveBeenCalledWith('/questions/q1', { order: 5 });
        // The body must be { order } only — not the full question object
        const body = api.patch.mock.calls[0][1] as object;
        expect(Object.keys(body)).toEqual(['order']);
    });

    it('no-ops when given an empty array', async () => {
        const api = { patch: vi.fn().mockResolvedValue({}) };
        const store = makeStore(api);

        await store.dispatch(saveQuestionsOrder([]) as ReturnType<typeof saveQuestionsOrder>);

        expect(api.patch).not.toHaveBeenCalled();
    });

    it('rejected — action payload contains the error message', async () => {
        const api = { patch: vi.fn().mockRejectedValue(new Error('fail')) };
        const store = makeStore(api);

        const result = await store.dispatch(saveQuestionsOrder([makeQ('q1', 1)]) as ReturnType<typeof saveQuestionsOrder>);

        expect(saveQuestionsOrder.rejected.match(result)).toBe(true);
        expect((result as ReturnType<typeof saveQuestionsOrder.rejected>).payload).toBe('Ошибка сохранения порядка');
    });
});
