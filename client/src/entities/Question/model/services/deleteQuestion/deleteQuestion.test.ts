import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { deleteQuestion } from './deleteQuestion';
import { questionReducer } from '../../slice/questionSlice';
import type { Question } from '../../types/Question';

const makeStore = (api: object) =>
    configureStore({
        reducer: { questions: questionReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const q1: Question = {
    id: 'q1',
    quizId: 'quiz1',
    order: 1,
    text: 'Вопрос 1',
    type: 'single',
    options: [],
    required: true
};

const q2: Question = { ...q1, id: 'q2', order: 2, text: 'Вопрос 2' };

describe('deleteQuestion', () => {
    it('fulfilled — calls DELETE /questions/{id}', async () => {
        const api = {
            delete: vi.fn().mockResolvedValue({}),
            get: vi.fn().mockResolvedValue({ data: [q2] }),
            patch: vi.fn().mockResolvedValue({ data: {} })
        };
        const store = makeStore(api);

        await store.dispatch(deleteQuestion({ id: 'q1', quizId: 'quiz1' }) as ReturnType<typeof deleteQuestion>);

        expect(api.delete).toHaveBeenCalledWith('/questions/q1');
    });

    it('fulfilled — GETs remaining questions to recount', async () => {
        const api = {
            delete: vi.fn().mockResolvedValue({}),
            get: vi.fn().mockResolvedValue({ data: [q2] }),
            patch: vi.fn().mockResolvedValue({ data: {} })
        };
        const store = makeStore(api);

        await store.dispatch(deleteQuestion({ id: 'q1', quizId: 'quiz1' }) as ReturnType<typeof deleteQuestion>);

        expect(api.get).toHaveBeenCalledWith('/questions', { params: { quizId: 'quiz1' } });
    });

    it('fulfilled — PATCHes /quizzes/{quizId} with updated questionsCount', async () => {
        const api = {
            delete: vi.fn().mockResolvedValue({}),
            get: vi.fn().mockResolvedValue({ data: [q2] }),
            patch: vi.fn().mockResolvedValue({ data: {} })
        };
        const store = makeStore(api);

        await store.dispatch(deleteQuestion({ id: 'q1', quizId: 'quiz1' }) as ReturnType<typeof deleteQuestion>);

        expect(api.patch).toHaveBeenCalledWith('/quizzes/quiz1', { questionsCount: 1 });
    });

    it('fulfilled — questionsCount is 0 when all questions are deleted', async () => {
        const api = {
            delete: vi.fn().mockResolvedValue({}),
            get: vi.fn().mockResolvedValue({ data: [] }),
            patch: vi.fn().mockResolvedValue({ data: {} })
        };
        const store = makeStore(api);

        await store.dispatch(deleteQuestion({ id: 'q1', quizId: 'quiz1' }) as ReturnType<typeof deleteQuestion>);

        expect(api.patch).toHaveBeenCalledWith('/quizzes/quiz1', { questionsCount: 0 });
    });

    it('rejected — action payload contains the error message', async () => {
        const api = { delete: vi.fn().mockRejectedValue(new Error('fail')) };
        const store = makeStore(api);

        const result = await store.dispatch(deleteQuestion({ id: 'q1', quizId: 'quiz1' }) as ReturnType<typeof deleteQuestion>);

        expect(deleteQuestion.rejected.match(result)).toBe(true);
        expect((result as ReturnType<typeof deleteQuestion.rejected>).payload).toBe('Ошибка удаления вопроса');
    });
});
