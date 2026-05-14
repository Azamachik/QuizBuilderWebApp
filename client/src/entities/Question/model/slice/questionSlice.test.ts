import { describe, it, expect } from 'vitest';
import { questionReducer, addQuestionToForm, updateQuestionInForm, removeQuestionFromForm, reorderQuestions } from './questionSlice';
import { fetchQuestions } from '../services/fetchQuestions/fetchQuestions';
import { saveQuestions } from '../services/saveQuestions/saveQuestions';
import type { QuestionSchema } from '../types/QuestionSchema';
import type { Question } from '../types/Question';

const makeQuestion = (id: string, order: number): Question => ({
    id,
    quizId: 'quiz1',
    order,
    text: `Question ${id}`,
    type: 'single',
    options: [{ id: 'o1', text: 'Option A', isCorrect: true }],
    required: false
});

const initialState: QuestionSchema = {
    questions: [],
    formData: [],
    isLoading: false,
    isSaving: false
};

describe('questionSlice', () => {
    it('returns initial state', () => {
        expect(questionReducer(undefined, { type: '' })).toEqual(initialState);
    });

    describe('addQuestionToForm', () => {
        it('appends question to formData', () => {
            const q = makeQuestion('q1', 1);
            const state = questionReducer(initialState, addQuestionToForm(q));
            expect(state.formData).toHaveLength(1);
            expect(state.formData[0]).toEqual(q);
        });

        it('preserves existing formData', () => {
            const q1 = makeQuestion('q1', 1);
            const q2 = makeQuestion('q2', 2);
            let state = questionReducer(initialState, addQuestionToForm(q1));
            state = questionReducer(state, addQuestionToForm(q2));
            expect(state.formData).toHaveLength(2);
        });
    });

    describe('updateQuestionInForm', () => {
        it('updates matched question in formData', () => {
            const q = makeQuestion('q1', 1);
            let state = questionReducer(initialState, addQuestionToForm(q));
            state = questionReducer(state, updateQuestionInForm({ id: 'q1', data: { text: 'Updated text' } }));
            expect(state.formData[0].text).toBe('Updated text');
        });

        it('does not mutate other questions', () => {
            const q1 = makeQuestion('q1', 1);
            const q2 = makeQuestion('q2', 2);
            let state = questionReducer(initialState, addQuestionToForm(q1));
            state = questionReducer(state, addQuestionToForm(q2));
            state = questionReducer(state, updateQuestionInForm({ id: 'q1', data: { text: 'Changed' } }));
            expect(state.formData[1].text).toBe('Question q2');
        });

        it('no-ops when id not found', () => {
            const q = makeQuestion('q1', 1);
            let state = questionReducer(initialState, addQuestionToForm(q));
            state = questionReducer(state, updateQuestionInForm({ id: 'notExist', data: { text: 'X' } }));
            expect(state.formData[0].text).toBe('Question q1');
        });
    });

    describe('removeQuestionFromForm', () => {
        it('removes question by id', () => {
            const q1 = makeQuestion('q1', 1);
            const q2 = makeQuestion('q2', 2);
            let state = questionReducer(initialState, addQuestionToForm(q1));
            state = questionReducer(state, addQuestionToForm(q2));
            state = questionReducer(state, removeQuestionFromForm('q1'));
            expect(state.formData).toHaveLength(1);
            expect(state.formData[0].id).toBe('q2');
        });

        it('re-indexes order after removal', () => {
            const q1 = makeQuestion('q1', 1);
            const q2 = makeQuestion('q2', 2);
            const q3 = makeQuestion('q3', 3);
            let state = questionReducer(initialState, addQuestionToForm(q1));
            state = questionReducer(state, addQuestionToForm(q2));
            state = questionReducer(state, addQuestionToForm(q3));
            state = questionReducer(state, removeQuestionFromForm('q1'));
            expect(state.formData[0].order).toBe(1);
            expect(state.formData[1].order).toBe(2);
        });
    });

    describe('reorderQuestions', () => {
        it('replaces formData with the provided order', () => {
            const q1 = makeQuestion('q1', 1);
            const q2 = makeQuestion('q2', 2);
            let state = questionReducer(initialState, addQuestionToForm(q1));
            state = questionReducer(state, addQuestionToForm(q2));
            state = questionReducer(state, reorderQuestions([q2, q1]));
            expect(state.formData[0].id).toBe('q2');
            expect(state.formData[1].id).toBe('q1');
        });
    });

    describe('fetchQuestions', () => {
        it('pending — sets isLoading, clears error', () => {
            const state = questionReducer({ ...initialState, error: 'old' }, fetchQuestions.pending('', ''));
            expect(state.isLoading).toBe(true);
            expect(state.error).toBeUndefined();
        });

        it('fulfilled — sets questions and formData', () => {
            const questions = [makeQuestion('q1', 1)];
            const state = questionReducer({ ...initialState, isLoading: true }, fetchQuestions.fulfilled(questions, '', ''));
            expect(state.isLoading).toBe(false);
            expect(state.questions).toEqual(questions);
            expect(state.formData).toEqual(questions);
        });

        it('rejected — clears loading, stores error', () => {
            const state = questionReducer({ ...initialState, isLoading: true }, fetchQuestions.rejected(null, '', '', 'Ошибка'));
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe('Ошибка');
        });
    });

    describe('saveQuestions', () => {
        it('pending — sets isSaving', () => {
            const state = questionReducer(initialState, saveQuestions.pending('', 'quiz1'));
            expect(state.isSaving).toBe(true);
        });

        it('fulfilled — updates questions and formData', () => {
            const saved = [makeQuestion('q1', 1)];
            const state = questionReducer({ ...initialState, isSaving: true }, saveQuestions.fulfilled(saved, '', 'quiz1'));
            expect(state.isSaving).toBe(false);
            expect(state.questions).toEqual(saved);
            expect(state.formData).toEqual(saved);
        });

        it('rejected — clears isSaving, sets fallback error message', () => {
            const state = questionReducer({ ...initialState, isSaving: true }, saveQuestions.rejected(null, '', 'quiz1', undefined));
            expect(state.isSaving).toBe(false);
            expect(state.error).toBe('Ошибка сохранения');
        });
    });
});
