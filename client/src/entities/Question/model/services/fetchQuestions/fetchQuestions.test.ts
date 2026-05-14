import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { fetchQuestions } from './fetchQuestions';
import { questionReducer } from '../../slice/questionSlice';
import type { Question } from '../../types/Question';

const makeStore = (api: object) =>
    configureStore({
        reducer: { questions: questionReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const mockQuestions: Question[] = [
    { id: 'q1', quizId: 'quiz1', order: 1, text: 'What is React?', type: 'single', options: [], required: true }
];

describe('fetchQuestions', () => {
    it('fulfilled — stores questions with correct API call', async () => {
        const api = { get: vi.fn().mockResolvedValue({ data: mockQuestions }) };
        const store = makeStore(api);

        await store.dispatch(fetchQuestions('quiz1') as ReturnType<typeof fetchQuestions>);

        expect(api.get).toHaveBeenCalledWith('/questions', { params: { quizId: 'quiz1' } });
        expect(store.getState().questions.questions).toEqual(mockQuestions);
        expect(store.getState().questions.formData).toEqual(mockQuestions);
        expect(store.getState().questions.isLoading).toBe(false);
    });

    it('rejected — sets error on API failure', async () => {
        const api = { get: vi.fn().mockRejectedValue(new Error('fail')) };
        const store = makeStore(api);

        await store.dispatch(fetchQuestions('quiz1') as ReturnType<typeof fetchQuestions>);

        expect(store.getState().questions.error).toBeTruthy();
        expect(store.getState().questions.isLoading).toBe(false);
    });
});
