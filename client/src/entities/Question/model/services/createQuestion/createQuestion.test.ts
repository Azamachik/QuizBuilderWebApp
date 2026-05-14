import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { createQuestion } from './createQuestion';
import { questionReducer } from '../../slice/questionSlice';
import type { Question } from '../../types/Question';

const makeStore = (api: object) =>
    configureStore({
        reducer: { questions: questionReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const payload: Omit<Question, 'id'> = {
    quizId: 'quiz1',
    order: 1,
    text: 'Что такое React?',
    type: 'single',
    options: [{ id: 'o1', text: 'Библиотека', isCorrect: true }],
    required: true
};

const created: Question = { id: 'q1', ...payload };

describe('createQuestion', () => {
    it('fulfilled — POSTs to /questions with the payload', async () => {
        const api = {
            post: vi.fn().mockResolvedValue({ data: created }),
            get: vi.fn().mockResolvedValue({ data: [created] }),
            patch: vi.fn().mockResolvedValue({ data: {} })
        };
        const store = makeStore(api);

        await store.dispatch(createQuestion(payload) as ReturnType<typeof createQuestion>);

        expect(api.post).toHaveBeenCalledWith('/questions', payload);
    });

    it('fulfilled — GETs current questions to recount', async () => {
        const api = {
            post: vi.fn().mockResolvedValue({ data: created }),
            get: vi.fn().mockResolvedValue({ data: [created] }),
            patch: vi.fn().mockResolvedValue({ data: {} })
        };
        const store = makeStore(api);

        await store.dispatch(createQuestion(payload) as ReturnType<typeof createQuestion>);

        expect(api.get).toHaveBeenCalledWith('/questions', { params: { quizId: 'quiz1' } });
    });

    it('fulfilled — PATCHes /quizzes/{quizId} with updated questionsCount', async () => {
        const existingQuestions: Question[] = [created, { ...created, id: 'q2', order: 2 }];
        const api = {
            post: vi.fn().mockResolvedValue({ data: created }),
            get: vi.fn().mockResolvedValue({ data: existingQuestions }),
            patch: vi.fn().mockResolvedValue({ data: {} })
        };
        const store = makeStore(api);

        await store.dispatch(createQuestion(payload) as ReturnType<typeof createQuestion>);

        expect(api.patch).toHaveBeenCalledWith('/quizzes/quiz1', { questionsCount: 2 });
    });

    it('fulfilled — returns created question', async () => {
        const api = {
            post: vi.fn().mockResolvedValue({ data: created }),
            get: vi.fn().mockResolvedValue({ data: [created] }),
            patch: vi.fn().mockResolvedValue({ data: {} })
        };
        const store = makeStore(api);

        const result = await store.dispatch(createQuestion(payload) as ReturnType<typeof createQuestion>);

        expect((result as any).payload).toEqual(created);
    });

    it('rejected — action payload contains the error message', async () => {
        const api = { post: vi.fn().mockRejectedValue(new Error('fail')) };
        const store = makeStore(api);

        const result = await store.dispatch(createQuestion(payload) as ReturnType<typeof createQuestion>);

        expect(createQuestion.rejected.match(result)).toBe(true);
        expect((result as ReturnType<typeof createQuestion.rejected>).payload).toBe('Ошибка создания вопроса');
    });
});
