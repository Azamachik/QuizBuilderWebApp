import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { inviteLinkReducer } from '@/entities/InviteLink';
import { attemptReducer } from '@/entities/Attempt';
import QuizResultsPage from './QuizResultsPage';

vi.mock('@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader', () => ({
    useDynamicModuleLoader: vi.fn(),
}));

const mockGet = vi.fn();

const SESSION = {
    inviteLink: {
        id: 'l1', quizId: 'q1', token: 'tok123', label: 'Test',
        maxUses: null, usedCount: 0, expiresAt: null, isActive: true,
        createdAt: new Date().toISOString(), createdBy: 'u1',
    },
    quiz: { id: 'q1', title: 'Тест по географии', description: '' },
    questions: [
        {
            id: 'qn1', quizId: 'q1', text: 'Столица России?', type: 'single' as const,
            options: [
                { id: 'o1', text: 'Москва', isCorrect: true },
                { id: 'o2', text: 'Лондон', isCorrect: false },
            ],
            required: false, order: 1,
        },
    ],
};

const ATTEMPT = {
    id: 'a1',
    quizId: 'q1',
    quizTitle: 'Тест по географии',
    inviteLinkToken: 'tok123',
    score: 1,
    total: 1,
    label: 'Test',
    completedAt: new Date().toISOString(),
    answers: [{ questionId: 'qn1', selectedOptionIds: ['o1'], textAnswer: '' }],
};

function makeStore() {
    return configureStore({
        reducer: { inviteLink: inviteLinkReducer, attempt: attemptReducer },
        middleware: (getDefault) =>
            getDefault({ thunk: { extraArgument: { api: { get: mockGet, post: vi.fn() } } } }),
    });
}

function renderPage() {
    const store = makeStore();
    const { container } = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/quiz/tok123/results/a1']}>
                <Routes>
                    <Route path='/quiz/:token/results/:attemptId' element={<QuizResultsPage />} />
                </Routes>
            </MemoryRouter>
        </Provider>,
    );
    return { store, container };
}

describe('QuizResultsPage', () => {
    beforeEach(() => {
        // Default: session returns SESSION, attempt returns ATTEMPT
        mockGet.mockImplementation((url: string) => {
            if (url.includes('/public/quiz/')) return Promise.resolve({ data: SESSION });
            if (url.includes('/public/attempts/')) return Promise.resolve({ data: ATTEMPT });
            return Promise.resolve({ data: null });
        });
    });

    describe('loading state', () => {
        it('renders loading skeleton while fetching', () => {
            mockGet.mockReturnValue(new Promise(() => {}));
            const { container } = renderPage();
            expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
        });
    });

    describe('no attempt', () => {
        it('shows "Результаты не найдены" when attempt API returns null', async () => {
            mockGet.mockImplementation((url: string) => {
                if (url.includes('/public/quiz/')) return Promise.resolve({ data: SESSION });
                return Promise.resolve({ data: null });
            });
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Результаты не найдены')).toBeInTheDocument();
            });
        });

        it('shows "На главную" button when no attempt', async () => {
            mockGet.mockImplementation((url: string) => {
                if (url.includes('/public/quiz/')) return Promise.resolve({ data: SESSION });
                return Promise.resolve({ data: null });
            });
            renderPage();
            await waitFor(() => {
                expect(screen.getByRole('button', { name: /На главную/ })).toBeInTheDocument();
            });
        });
    });

    describe('with attempt', () => {
        it('shows quiz title', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Тест по географии')).toBeInTheDocument();
            });
        });

        it('shows score percentage (100% for 1/1)', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('100%')).toBeInTheDocument();
            });
        });

        it('shows "Отличный результат!" for high score', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Отличный результат!')).toBeInTheDocument();
            });
        });

        it('shows correct count text', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Правильно: 1 из 1')).toBeInTheDocument();
            });
        });

        it('shows "Пройти ещё раз" button', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByRole('button', { name: /Пройти ещё раз/ })).toBeInTheDocument();
            });
        });

        it('shows answer breakdown when questions come from session', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Разбор ответов')).toBeInTheDocument();
            });
            expect(screen.getByText('Столица России?')).toBeInTheDocument();
        });

        it('shows retry-blocked warning when maxUses exhausted', async () => {
            const exhaustedSession = {
                ...SESSION,
                inviteLink: { ...SESSION.inviteLink, maxUses: 1, usedCount: 1 },
            };
            mockGet.mockImplementation((url: string) => {
                if (url.includes('/public/quiz/')) return Promise.resolve({ data: exhaustedSession });
                if (url.includes('/public/attempts/')) return Promise.resolve({ data: ATTEMPT });
                return Promise.resolve({ data: null });
            });
            renderPage();
            await waitFor(() => screen.getByRole('button', { name: /Пройти ещё раз/ }));
            await userEvent.click(screen.getByRole('button', { name: /Пройти ещё раз/ }));
            expect(screen.getByText(/лимит использований/)).toBeInTheDocument();
        });

        it('shows "Хороший результат!" for mid-range score', async () => {
            const midAttempt = { ...ATTEMPT, score: 1, total: 2 };
            mockGet.mockImplementation((url: string) => {
                if (url.includes('/public/quiz/')) return Promise.resolve({ data: SESSION });
                if (url.includes('/public/attempts/')) return Promise.resolve({ data: midAttempt });
                return Promise.resolve({ data: null });
            });
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Хороший результат!')).toBeInTheDocument();
            });
        });

        it('shows "Есть над чем поработать" for low score', async () => {
            const lowAttempt = { ...ATTEMPT, score: 0, total: 2 };
            mockGet.mockImplementation((url: string) => {
                if (url.includes('/public/quiz/')) return Promise.resolve({ data: SESSION });
                if (url.includes('/public/attempts/')) return Promise.resolve({ data: lowAttempt });
                return Promise.resolve({ data: null });
            });
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Есть над чем поработать')).toBeInTheDocument();
            });
        });
    });
});
