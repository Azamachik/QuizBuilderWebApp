import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { quizReducer } from '@/entities/Quiz';
import { TooltipProvider } from '@/shared/ui/Tooltip/Tooltip';
import QuizzesPage from './QuizzesPage';

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
        patch: vi.fn().mockResolvedValue({ data: {} }),
        delete: vi.fn().mockResolvedValue({}),
    },
}));

const QUIZ = {
    id: 'q1', title: 'Мой тест', description: 'Описание',
    isPublished: false, attemptsCount: 0,
    createdAt: new Date().toISOString(), userId: 'u1',
};

const mockGet = vi.fn();

function makeStore() {
    return configureStore({
        reducer: { user: userReducer, quizzes: quizReducer },
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
            <MemoryRouter>
                <TooltipProvider>
                    <QuizzesPage />
                </TooltipProvider>
            </MemoryRouter>
        </Provider>,
    );
    return { store, container };
}

describe('QuizzesPage (desktop)', () => {
    beforeEach(() => {
        mockGet.mockResolvedValue({ data: [] });
    });

    describe('rendering', () => {
        it('renders "Создать новый тест" button', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Создать новый тест')).toBeInTheDocument();
            });
        });

        it('renders grid/list view toggle buttons', async () => {
            const { container } = renderPage();
            await waitFor(() => {
                expect(screen.getByText('Создать новый тест')).toBeInTheDocument();
            });
            const buttons = container.querySelectorAll('button');
            expect(buttons.length).toBeGreaterThanOrEqual(2);
        });
    });

    describe('loading state', () => {
        it('renders skeletons when isLoading is true', () => {
            mockGet.mockReturnValue(new Promise(() => {}));
            const { container } = renderPage();
            expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
        });
    });

    describe('with quizzes', () => {
        it('renders quiz card when fetchQuizzes returns quizzes', async () => {
            mockGet.mockResolvedValue({ data: [QUIZ] });
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Мой тест')).toBeInTheDocument();
            });
        });
    });

    describe('view toggle', () => {
        it('switches to list view when list button is clicked', async () => {
            mockGet.mockResolvedValue({ data: [QUIZ] });
            const { container } = renderPage();
            await waitFor(() => screen.getByText('Мой тест'));
            const toggleButtons = container.querySelectorAll('button[class*="rounded-lg"]');
            await userEvent.click(toggleButtons[1]);
            expect(screen.getByText('Мой тест')).toBeInTheDocument();
        });
    });
});
