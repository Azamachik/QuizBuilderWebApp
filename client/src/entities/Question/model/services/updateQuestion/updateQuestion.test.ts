import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { updateQuestion } from './updateQuestion';
import { questionReducer } from '../../slice/questionSlice';
import type { Question } from '../../types/Question';

const makeStore = (api: object) =>
    configureStore({
        reducer: { questions: questionReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const original: Question = {
    id: 'q1',
    quizId: 'quiz1',
    order: 1,
    text: 'Старый текст',
    type: 'single',
    options: [{ id: 'o1', text: 'Вариант A', isCorrect: true }],
    required: true
};

const updated: Question = { ...original, text: 'Новый текст', required: false };

describe('updateQuestion', () => {
    it('fulfilled — PATCHes /questions/{id} with provided data', async () => {
        const api = { patch: vi.fn().mockResolvedValue({ data: updated }) };
        const store = makeStore(api);

        await store.dispatch(
            updateQuestion({ id: 'q1', data: { text: 'Новый текст', required: false } }) as ReturnType<typeof updateQuestion>
        );

        expect(api.patch).toHaveBeenCalledWith('/questions/q1', { text: 'Новый текст', required: false });
    });

    it('fulfilled — returns updated question', async () => {
        const api = { patch: vi.fn().mockResolvedValue({ data: updated }) };
        const store = makeStore(api);

        const result = await store.dispatch(
            updateQuestion({ id: 'q1', data: { text: 'Новый текст' } }) as ReturnType<typeof updateQuestion>
        );

        expect((result as any).payload).toEqual(updated);
    });

    it('can update options array', async () => {
        const newOptions = [{ id: 'o2', text: 'Вариант B', isCorrect: false }];
        const api = { patch: vi.fn().mockResolvedValue({ data: { ...original, options: newOptions } }) };
        const store = makeStore(api);

        await store.dispatch(updateQuestion({ id: 'q1', data: { options: newOptions } }) as ReturnType<typeof updateQuestion>);

        expect(api.patch).toHaveBeenCalledWith('/questions/q1', { options: newOptions });
    });

    it('rejected — action payload contains the error message', async () => {
        const api = { patch: vi.fn().mockRejectedValue(new Error('fail')) };
        const store = makeStore(api);

        const result = await store.dispatch(updateQuestion({ id: 'q1', data: { text: 'X' } }) as ReturnType<typeof updateQuestion>);

        expect(updateQuestion.rejected.match(result)).toBe(true);
        expect((result as ReturnType<typeof updateQuestion.rejected>).payload).toBe('Ошибка обновления вопроса');
    });
});
