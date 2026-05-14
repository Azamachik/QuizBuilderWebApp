import { describe, it, expect } from 'vitest';
import { quizReducer } from './quizSlice';
import { fetchQuizzes } from '../services/fetchQuizzes/fetchQuizzes';
import { fetchQuizById } from '../services/fetchQuizById/fetchQuizById';
import { createQuiz } from '../services/createQuiz/createQuiz';
import { updateQuiz } from '../services/updateQuiz/updateQuiz';
import { deleteQuiz } from '../services/deleteQuiz/deleteQuiz';
import { toggleQuizStatus } from '../services/toggleQuizStatus/toggleQuizStatus';
import type { QuizSchema } from '../types/QuizSchema';
import type { Quiz } from '../types/Quiz';

const mockQuiz: Quiz = {
    id: '1',
    title: 'Test Quiz',
    authorId: 'user1',
    isPublished: false,
    createdAt: '2024-01-01T00:00:00.000Z',
    attemptsCount: 0,
    questionsCount: 5
};

const initialState: QuizSchema = {
    quizzes: [],
    isLoading: false,
    currentQuizIsLoading: false
};

describe('quizSlice', () => {
    it('returns initial state', () => {
        expect(quizReducer(undefined, { type: '' })).toEqual(initialState);
    });

    describe('fetchQuizzes', () => {
        it('pending — sets isLoading, clears error', () => {
            const state = quizReducer({ ...initialState, error: 'old error' }, fetchQuizzes.pending('', ''));
            expect(state.isLoading).toBe(true);
            expect(state.error).toBeUndefined();
        });

        it('fulfilled — stores quizzes and clears loading', () => {
            const state = quizReducer({ ...initialState, isLoading: true }, fetchQuizzes.fulfilled([mockQuiz], '', ''));
            expect(state.isLoading).toBe(false);
            expect(state.quizzes).toEqual([mockQuiz]);
        });

        it('rejected — clears loading, stores error', () => {
            const state = quizReducer({ ...initialState, isLoading: true }, fetchQuizzes.rejected(null, '', '', 'Ошибка загрузки тестов'));
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe('Ошибка загрузки тестов');
        });
    });

    describe('fetchQuizById', () => {
        it('pending — sets currentQuizIsLoading', () => {
            const state = quizReducer(initialState, fetchQuizById.pending('', ''));
            expect(state.currentQuizIsLoading).toBe(true);
        });

        it('fulfilled — sets currentQuiz', () => {
            const state = quizReducer({ ...initialState, currentQuizIsLoading: true }, fetchQuizById.fulfilled(mockQuiz, '', ''));
            expect(state.currentQuizIsLoading).toBe(false);
            expect(state.currentQuiz).toEqual(mockQuiz);
        });

        it('rejected — clears currentQuizIsLoading', () => {
            const state = quizReducer({ ...initialState, currentQuizIsLoading: true }, fetchQuizById.rejected(null, '', ''));
            expect(state.currentQuizIsLoading).toBe(false);
        });
    });

    describe('createQuiz', () => {
        it('fulfilled — appends quiz to list', () => {
            const state = quizReducer(initialState, createQuiz.fulfilled(mockQuiz, '', { title: 'Test', authorId: 'user1' }));
            expect(state.quizzes).toHaveLength(1);
            expect(state.quizzes[0]).toEqual(mockQuiz);
        });
    });

    describe('updateQuiz', () => {
        it('fulfilled — replaces quiz in list', () => {
            const updated = { ...mockQuiz, title: 'Updated Title' };
            const state = quizReducer(
                { ...initialState, quizzes: [mockQuiz] },
                updateQuiz.fulfilled(updated, '', { id: '1', data: { title: 'Updated Title' } })
            );
            expect(state.quizzes[0].title).toBe('Updated Title');
        });

        it('fulfilled — updates currentQuiz when id matches', () => {
            const updated = { ...mockQuiz, title: 'Updated' };
            const state = quizReducer(
                { ...initialState, quizzes: [mockQuiz], currentQuiz: mockQuiz },
                updateQuiz.fulfilled(updated, '', { id: '1', data: { title: 'Updated' } })
            );
            expect(state.currentQuiz?.title).toBe('Updated');
        });

        it('fulfilled — does not mutate list when id not found', () => {
            const foreign = { ...mockQuiz, id: '999' };
            const state = quizReducer(
                { ...initialState, quizzes: [mockQuiz] },
                updateQuiz.fulfilled(foreign, '', { id: '999', data: { title: '' } })
            );
            expect(state.quizzes[0]).toEqual(mockQuiz);
        });
    });

    describe('deleteQuiz', () => {
        it('fulfilled — removes quiz from list', () => {
            const state = quizReducer({ ...initialState, quizzes: [mockQuiz] }, deleteQuiz.fulfilled('1', '', '1'));
            expect(state.quizzes).toHaveLength(0);
        });

        it('fulfilled — does not touch unrelated quizzes', () => {
            const other: Quiz = { ...mockQuiz, id: '2', title: 'Other' };
            const state = quizReducer({ ...initialState, quizzes: [mockQuiz, other] }, deleteQuiz.fulfilled('1', '', '1'));
            expect(state.quizzes).toHaveLength(1);
            expect(state.quizzes[0].id).toBe('2');
        });
    });

    describe('toggleQuizStatus', () => {
        it('fulfilled — updates isPublished in list', () => {
            const toggled = { ...mockQuiz, isPublished: true };
            const state = quizReducer(
                { ...initialState, quizzes: [mockQuiz] },
                toggleQuizStatus.fulfilled(toggled, '', { id: '1', isPublished: false })
            );
            expect(state.quizzes[0].isPublished).toBe(true);
        });

        it('fulfilled — updates currentQuiz when it matches', () => {
            const toggled = { ...mockQuiz, isPublished: true };
            const state = quizReducer(
                { ...initialState, quizzes: [mockQuiz], currentQuiz: mockQuiz },
                toggleQuizStatus.fulfilled(toggled, '', { id: '1', isPublished: false })
            );
            expect(state.currentQuiz?.isPublished).toBe(true);
        });
    });
});
