import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { quizReducer } from '@/entities/Quiz';
import { CreateQuizModal } from './CreateQuizModal';

const mockApi = {
    post: vi.fn().mockResolvedValue({
        data: {
            id: 'new-id',
            title: 'Test',
            authorId: 'u1',
            isPublished: false,
            createdAt: '',
            attemptsCount: 0,
            questionsCount: 0
        }
    })
};

function makeStore(withUser = true) {
    return configureStore({
        reducer: { user: userReducer, quizzes: quizReducer },
        preloadedState: withUser ? { user: { authData: { id: 'u1', username: 'user', token: 'tok' }, _inited: true } } : undefined,
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api: mockApi } } })
    });
}

function renderModal(open = true, onOpenChange = vi.fn()) {
    const store = makeStore();
    render(
        <Provider store={store}>
            <CreateQuizModal open={open} onOpenChange={onOpenChange} />
        </Provider>
    );
    return { store, onOpenChange };
}

describe('CreateQuizModal', () => {
    describe('rendering', () => {
        it('does not render when open=false', () => {
            renderModal(false);
            expect(screen.queryByText('Новый тест')).toBeNull();
        });

        it('renders dialog title when open=true', () => {
            renderModal();
            expect(screen.getByText('Новый тест')).toBeInTheDocument();
        });

        it('renders title input', () => {
            renderModal();
            expect(screen.getByPlaceholderText('Введите название теста')).toBeInTheDocument();
        });

        it('renders description textarea', () => {
            renderModal();
            expect(screen.getByPlaceholderText('Краткое описание (необязательно)')).toBeInTheDocument();
        });
    });

    describe('cancel', () => {
        it('calls onOpenChange(false) when "Отмена" is clicked', async () => {
            const onOpenChange = vi.fn();
            renderModal(true, onOpenChange);
            await userEvent.click(screen.getByRole('button', { name: 'Отмена' }));
            expect(onOpenChange).toHaveBeenCalledWith(false);
        });
    });

    describe('submit', () => {
        it('calls createQuiz API and closes modal on valid submit', async () => {
            const onOpenChange = vi.fn();
            renderModal(true, onOpenChange);

            await userEvent.type(screen.getByPlaceholderText('Введите название теста'), 'Мой тест');
            await userEvent.click(screen.getByRole('button', { name: 'Создать' }));

            expect(mockApi.post).toHaveBeenCalledWith('/quizzes', expect.objectContaining({ title: 'Мой тест', authorId: 'u1' }));
            expect(onOpenChange).toHaveBeenCalledWith(false);
        });

        it('clears form after successful submit', async () => {
            const onOpenChange = vi.fn();
            renderModal(true, onOpenChange);
            const titleInput = screen.getByPlaceholderText('Введите название теста');

            await userEvent.type(titleInput, 'Тест');
            await userEvent.click(screen.getByRole('button', { name: 'Создать' }));

            expect(onOpenChange).toHaveBeenCalledWith(false);
        });
    });
});
