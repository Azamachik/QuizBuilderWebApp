import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { quizReducer } from '@/entities/Quiz';
import { questionReducer } from '@/entities/Question';
import { TooltipProvider } from '@/shared/ui/Tooltip/Tooltip';
import QuizEditorPage from './QuizEditorPage';

vi.mock('@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader', () => ({
    useDynamicModuleLoader: vi.fn(),
}));

vi.mock('@/shared/lib/helpers/hooks/useIsMobile/useIsMobile', () => ({
    useIsMobile: vi.fn().mockReturnValue(false),
}));

vi.mock('@/shared/api/api', () => ({
    $api: {
        get: vi.fn().mockResolvedValue({ data: [] }),
        post: vi.fn().mockResolvedValue({ data: {} }),
    },
}));

const QUIZ = {
    id: 'q1',
    title: 'Мой тест',
    description: 'Описание теста',
    isPublished: false,
    attemptsCount: 0,
    createdAt: new Date().toISOString(),
    userId: 'u1',
};

const mockGet = vi.fn();

function makeStore() {
    return configureStore({
        reducer: { user: userReducer, quizzes: quizReducer, questions: questionReducer },
        preloadedState: {
            user: { authData: { id: 'u1', username: 'user', email: 'u@mail.ru', token: 'tok' }, _inited: true },
        },
        middleware: (getDefault) =>
            getDefault({ thunk: { extraArgument: { api: { get: mockGet, post: vi.fn() } } } }),
    });
}

function renderPage() {
    const store = makeStore();
    const { container } = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/editor/q1']}>
                <TooltipProvider>
                    <Routes>
                        <Route path='/editor/:id' element={<QuizEditorPage />} />
                    </Routes>
                </TooltipProvider>
            </MemoryRouter>
        </Provider>,
    );
    return { store, container };
}

describe('QuizEditorPage (desktop)', () => {
    beforeEach(() => {
        mockGet.mockImplementation((url: string) => {
            if (url.includes('/quizzes')) return Promise.resolve({ data: QUIZ });
            if (url.includes('/questions')) return Promise.resolve({ data: [] });
            return Promise.resolve({ data: null });
        });
    });

    describe('rendering', () => {
        it('renders "Добавить новый вопрос" button', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Добавить новый вопрос')).toBeInTheDocument();
            });
        });

        it('renders "Сохранить" button', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByRole('button', { name: /Сохранить/ })).toBeInTheDocument();
            });
        });

        it('renders "Создать ссылку" button', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByRole('button', { name: /Создать ссылку/ })).toBeInTheDocument();
            });
        });
    });

    describe('loading state', () => {
        it('shows skeleton while quiz is loading', () => {
            mockGet.mockReturnValue(new Promise(() => {}));
            const { container } = renderPage();
            expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
        });
    });

    describe('with quiz data', () => {
        it('shows quiz title when loaded', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Мой тест')).toBeInTheDocument();
            });
        });

        it('shows quiz description when loaded', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Описание теста')).toBeInTheDocument();
            });
        });

        it('renders "Опубликовать" button when quiz is not published', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByRole('button', { name: 'Опубликовать' })).toBeInTheDocument();
            });
        });

        it('renders "Снять с публикации" when quiz is published', async () => {
            mockGet.mockImplementation((url: string) => {
                if (url.includes('/quizzes')) return Promise.resolve({ data: { ...QUIZ, isPublished: true } });
                if (url.includes('/questions')) return Promise.resolve({ data: [] });
                return Promise.resolve({ data: null });
            });
            renderPage();
            await waitFor(() => {
                expect(screen.getByRole('button', { name: 'Снять с публикации' })).toBeInTheDocument();
            });
        });
    });

    describe('with questions', () => {
        it('renders question cards when questions are loaded', async () => {
            const question = {
                id: 'qn1', quizId: 'q1', text: 'Тестовый вопрос?',
                type: 'single' as const,
                options: [{ id: 'o1', text: 'Вариант', isCorrect: true }],
                required: false, order: 1,
            };
            mockGet.mockImplementation((url: string) => {
                if (url.includes('/quizzes')) return Promise.resolve({ data: QUIZ });
                if (url.includes('/questions')) return Promise.resolve({ data: [question] });
                return Promise.resolve({ data: null });
            });
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Тестовый вопрос?')).toBeInTheDocument();
            });
        });
    });
});
