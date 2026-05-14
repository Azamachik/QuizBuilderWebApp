import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { saveQuestions } from './saveQuestions';
import { questionReducer } from '../../slice/questionSlice';
import type { Question } from '../../types/Question';
import type { QuestionSchema } from '../../types/QuestionSchema';

const makeQ = (id: string, order: number, quizId = 'quiz1'): Question => ({
    id,
    quizId,
    order,
    text: `Вопрос ${id}`,
    type: 'single',
    options: [],
    required: false
});

function makeStore(api: object, questionsState: Partial<QuestionSchema> = {}) {
    return configureStore({
        reducer: { questions: questionReducer },
        preloadedState: {
            questions: {
                questions: [],
                formData: [],
                isLoading: false,
                isSaving: false,
                ...questionsState
            }
        },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });
}

describe('saveQuestions', () => {
    describe('creating new questions', () => {
        it('POSTs each new question (temp-id not in server set)', async () => {
            const newQ = makeQ('temp-1', 1);
            const savedQ: Question = { ...newQ, id: 'server-1' };
            const api = {
                post: vi.fn().mockResolvedValue({ data: savedQ }),
                delete: vi.fn().mockResolvedValue({}),
                patch: vi.fn().mockResolvedValue({})
            };
            const store = makeStore(api, { questions: [], formData: [newQ] });

            await store.dispatch(saveQuestions('quiz1') as ReturnType<typeof saveQuestions>);

            const { id: _tempId, ...rest } = newQ;
            expect(api.post).toHaveBeenCalledWith('/questions', rest);
        });

        it('PATCHes /quizzes/{quizId} with questionsCount after creation', async () => {
            const newQ = makeQ('temp-1', 1);
            const savedQ: Question = { ...newQ, id: 'server-1' };
            const api = {
                post: vi.fn().mockResolvedValue({ data: savedQ }),
                delete: vi.fn().mockResolvedValue({}),
                patch: vi.fn().mockResolvedValue({})
            };
            const store = makeStore(api, { questions: [], formData: [newQ] });

            await store.dispatch(saveQuestions('quiz1') as ReturnType<typeof saveQuestions>);

            expect(api.patch).toHaveBeenCalledWith('/quizzes/quiz1', { questionsCount: 1 });
        });
    });

    describe('deleting removed questions', () => {
        it('DELETEs questions that are in server state but not in formData', async () => {
            const q1 = makeQ('q1', 1);
            const q2 = makeQ('q2', 2);
            const api = {
                post: vi.fn().mockResolvedValue({}),
                delete: vi.fn().mockResolvedValue({}),
                patch: vi.fn().mockResolvedValue({})
            };
            // q2 was removed from formData
            const store = makeStore(api, { questions: [q1, q2], formData: [q1] });

            await store.dispatch(saveQuestions('quiz1') as ReturnType<typeof saveQuestions>);

            expect(api.delete).toHaveBeenCalledWith('/questions/q2');
        });

        it('does not DELETE questions that remain in formData', async () => {
            const q1 = makeQ('q1', 1);
            const api = {
                post: vi.fn().mockResolvedValue({}),
                delete: vi.fn().mockResolvedValue({}),
                patch: vi.fn().mockResolvedValue({})
            };
            const store = makeStore(api, { questions: [q1], formData: [q1] });

            await store.dispatch(saveQuestions('quiz1') as ReturnType<typeof saveQuestions>);

            expect(api.delete).not.toHaveBeenCalled();
        });
    });

    describe('updating existing questions', () => {
        it('PATCHes questions that exist in both server and formData', async () => {
            const q1 = makeQ('q1', 1);
            const q1Updated = { ...q1, text: 'Изменённый текст' };
            const api = {
                post: vi.fn().mockResolvedValue({}),
                delete: vi.fn().mockResolvedValue({}),
                patch: vi.fn().mockResolvedValue({})
            };
            const store = makeStore(api, { questions: [q1], formData: [q1Updated] });

            await store.dispatch(saveQuestions('quiz1') as ReturnType<typeof saveQuestions>);

            expect(api.patch).toHaveBeenCalledWith('/questions/q1', q1Updated);
        });
    });

    describe('error handling', () => {
        it('rejected — sets error message on API failure', async () => {
            const api = { post: vi.fn().mockRejectedValue(new Error('fail')) };
            const store = makeStore(api, { questions: [], formData: [makeQ('temp-1', 1)] });

            await store.dispatch(saveQuestions('quiz1') as ReturnType<typeof saveQuestions>);

            expect(store.getState().questions.error).toBe('Ошибка сохранения');
        });

        it('rejected — sets isSaving=false', async () => {
            const api = { post: vi.fn().mockRejectedValue(new Error('fail')) };
            const store = makeStore(api, { questions: [], formData: [makeQ('temp-1', 1)] });

            await store.dispatch(saveQuestions('quiz1') as ReturnType<typeof saveQuestions>);

            expect(store.getState().questions.isSaving).toBe(false);
        });
    });
});
