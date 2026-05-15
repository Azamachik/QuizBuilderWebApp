import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { quizReducer } from '@/entities/Quiz';
import type { Quiz } from '@/entities/Quiz';
import { EditQuizModal } from './EditQuizModal';

const mockApi = {
    patch: vi.fn().mockResolvedValue({
        data: { id: 'q1', title: 'Updated', authorId: 'u1', isPublished: false, createdAt: '', attemptsCount: 0, questionsCount: 0 },
    }),
};

const mockQuiz: Quiz = {
    id: 'q1',
    title: 'Старый заголовок',
    description: 'Старое описание',
    authorId: 'u1',
    isPublished: false,
    createdAt: '2024-01-01',
    attemptsCount: 0,
    questionsCount: 3,
};

function makeStore() {
    return configureStore({
        reducer: { quizzes: quizReducer },
        preloadedState: { quizzes: { quizzes: [mockQuiz], isLoading: false, currentQuizIsLoading: false } },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api: mockApi } } }),
    });
}

function renderModal(quiz: Quiz | null = mockQuiz, onOpenChange = vi.fn()) {
    const store = makeStore();
    render(
        <Provider store={store}>
            <EditQuizModal quiz={quiz} onOpenChange={onOpenChange} />
        </Provider>,
    );
    return { store, onOpenChange };
}

describe('EditQuizModal', () => {
    describe('rendering', () => {
        it('does not render when quiz is null', () => {
            renderModal(null);
            expect(screen.queryByText('Редактировать тест')).toBeNull();
        });

        it('renders dialog title when quiz is provided', () => {
            renderModal();
            expect(screen.getByText('Редактировать тест')).toBeInTheDocument();
        });

        it('pre-populates title input with quiz.title', async () => {
            renderModal();
            const titleInput = screen.getByPlaceholderText('Введите название теста') as HTMLInputElement;
            expect(titleInput.value).toBe('Старый заголовок');
        });

        it('pre-populates description with quiz.description', async () => {
            renderModal();
            const descInput = screen.getByPlaceholderText('Краткое описание (необязательно)') as HTMLTextAreaElement;
            expect(descInput.value).toBe('Старое описание');
        });
    });

    describe('cancel', () => {
        it('calls onOpenChange(false) when "Отмена" is clicked', async () => {
            const onOpenChange = vi.fn();
            renderModal(mockQuiz, onOpenChange);
            await userEvent.click(screen.getByRole('button', { name: 'Отмена' }));
            expect(onOpenChange).toHaveBeenCalledWith(false);
        });
    });

    describe('submit', () => {
        it('calls updateQuiz with new data and closes modal', async () => {
            const onOpenChange = vi.fn();
            renderModal(mockQuiz, onOpenChange);

            const titleInput = screen.getByPlaceholderText('Введите название теста');
            await userEvent.clear(titleInput);
            await userEvent.type(titleInput, 'Новый заголовок');
            await userEvent.click(screen.getByRole('button', { name: 'Сохранить' }));

            expect(mockApi.patch).toHaveBeenCalledWith(
                '/quizzes/q1',
                expect.objectContaining({ title: 'Новый заголовок' }),
            );
            expect(onOpenChange).toHaveBeenCalledWith(false);
        });
    });
});
