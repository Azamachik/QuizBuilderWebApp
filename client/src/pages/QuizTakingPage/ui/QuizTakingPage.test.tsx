import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { inviteLinkReducer } from '@/entities/InviteLink';
import { attemptReducer } from '@/entities/Attempt';
import QuizTakingPage from './QuizTakingPage';

vi.mock('@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader', () => ({
    useDynamicModuleLoader: vi.fn()
}));

const mockGet = vi.fn();
const mockPost = vi.fn().mockResolvedValue({ data: { id: 'a1' } });

const SESSION = {
    inviteLink: {
        id: 'l1',
        quizId: 'q1',
        token: 'tok123',
        label: 'Test',
        maxUses: null,
        usedCount: 0,
        expiresAt: null,
        isActive: true,
        createdAt: new Date().toISOString(),
        createdBy: 'u1'
    },
    quiz: { id: 'q1', title: 'Тест по истории', description: '' },
    questions: [
        {
            id: 'qn1',
            quizId: 'q1',
            text: 'Вопрос первый?',
            type: 'single' as const,
            options: [
                { id: 'o1', text: 'Вариант А', isCorrect: true },
                { id: 'o2', text: 'Вариант Б', isCorrect: false }
            ],
            required: false,
            order: 1
        },
        {
            id: 'qn2',
            quizId: 'q1',
            text: 'Вопрос второй?',
            type: 'text' as const,
            options: [],
            required: false,
            order: 2
        }
    ]
};

function makeStore() {
    return configureStore({
        reducer: { inviteLink: inviteLinkReducer, attempt: attemptReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api: { get: mockGet, post: mockPost } } } })
    });
}

function renderPage() {
    const store = makeStore();
    const { container } = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/quiz/tok123']}>
                <Routes>
                    <Route path='/quiz/:token' element={<QuizTakingPage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
    return { store, container };
}

describe('QuizTakingPage', () => {
    beforeEach(() => {
        mockGet.mockResolvedValue({ data: SESSION });
        mockPost.mockResolvedValue({ data: { id: 'a1' } });
    });

    describe('loading state', () => {
        it('renders loading skeleton while fetching', () => {
            mockGet.mockReturnValue(new Promise(() => {}));
            const { container } = renderPage();
            expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
        });
    });

    describe('error state', () => {
        it('shows "Тест недоступен" heading when API rejects', async () => {
            mockGet.mockRejectedValue(new Error('not found'));
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Тест недоступен')).toBeInTheDocument();
            });
        });
    });

    describe('empty questions state', () => {
        it('shows "нет вопросов" message when session has no questions', async () => {
            mockGet.mockResolvedValue({ data: { ...SESSION, questions: [] } });
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('В этом тесте пока нет вопросов.')).toBeInTheDocument();
            });
        });
    });

    describe('quiz taking UI', () => {
        it('shows quiz title and question counter', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Тест по истории')).toBeInTheDocument();
            });
            expect(screen.getByText('1 / 2')).toBeInTheDocument();
        });

        it('renders first question text', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Вопрос первый?')).toBeInTheDocument();
            });
        });

        it('renders answer options for single-choice question', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Вариант А')).toBeInTheDocument();
            });
            expect(screen.getByText('Вариант Б')).toBeInTheDocument();
        });

        it('disables back button on first question', async () => {
            renderPage();
            await waitFor(() => screen.getByRole('button', { name: /Назад/ }));
            expect(screen.getByRole('button', { name: /Назад/ })).toBeDisabled();
        });

        it('shows "Далее" button when not on last question', async () => {
            renderPage();
            await waitFor(() => expect(screen.getByRole('button', { name: /Далее/ })).toBeInTheDocument());
        });

        it('shows "Завершить" on the last question after navigation', async () => {
            renderPage();
            await waitFor(() => screen.getByRole('button', { name: /Далее/ }));
            await userEvent.click(screen.getByRole('button', { name: /Далее/ }));
            expect(screen.getByRole('button', { name: 'Завершить' })).toBeInTheDocument();
        });

        it('shows required warning when trying to skip required question', async () => {
            mockGet.mockResolvedValue({
                data: {
                    ...SESSION,
                    questions: [{ ...SESSION.questions[0], required: true }]
                }
            });
            renderPage();
            await waitFor(() => screen.getByRole('button', { name: 'Завершить' }));
            await userEvent.click(screen.getByRole('button', { name: 'Завершить' }));
            expect(screen.getByText(/Этот вопрос обязателен/)).toBeInTheDocument();
        });
    });

    describe('complete phase', () => {
        it('shows "Вы ответили на все вопросы!" after completing all questions', async () => {
            renderPage();
            await waitFor(() => screen.getByRole('button', { name: /Далее/ }));
            await userEvent.click(screen.getByRole('button', { name: /Далее/ }));
            await userEvent.click(screen.getByRole('button', { name: 'Завершить' }));
            expect(screen.getByText('Вы ответили на все вопросы!')).toBeInTheDocument();
        });

        it('shows "Отправить результаты" button in complete phase', async () => {
            renderPage();
            await waitFor(() => screen.getByRole('button', { name: /Далее/ }));
            await userEvent.click(screen.getByRole('button', { name: /Далее/ }));
            await userEvent.click(screen.getByRole('button', { name: 'Завершить' }));
            expect(screen.getByRole('button', { name: 'Отправить результаты' })).toBeInTheDocument();
        });

        it('allows returning to questions from complete phase', async () => {
            renderPage();
            await waitFor(() => screen.getByRole('button', { name: /Далее/ }));
            await userEvent.click(screen.getByRole('button', { name: /Далее/ }));
            await userEvent.click(screen.getByRole('button', { name: 'Завершить' }));
            await userEvent.click(screen.getByRole('button', { name: 'Вернуться к вопросам' }));
            expect(screen.getByText('Вопрос второй?')).toBeInTheDocument();
        });
    });
});
