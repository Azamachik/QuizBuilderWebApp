import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { profileReducer } from '@/entities/Profile';
import { quizReducer } from '@/entities/Quiz';
import { TooltipProvider } from '@/shared/ui/Tooltip/Tooltip';
import ProfilePage from './ProfilePage';

vi.mock('@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader', () => ({
    useDynamicModuleLoader: vi.fn()
}));

vi.mock('@/shared/lib/helpers/hooks/useIsMobile/useIsMobile', () => ({
    useIsMobile: vi.fn().mockReturnValue(false)
}));

const USER_DATA = { id: 'u1', username: 'alice', email: 'alice@mail.ru', token: 'tok', createdAt: '2024-01-15' };

const PROFILE_DATA = { id: 'u1', firstName: 'Алиса', lastName: 'Иванова', avatarUrl: '', createdAt: '2024-01-15' };

const mockGet = vi.fn();

function makeStore() {
    return configureStore({
        reducer: { user: userReducer, profile: profileReducer, quizzes: quizReducer },
        preloadedState: {
            user: { authData: USER_DATA, _inited: true }
        },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api: { get: mockGet, post: vi.fn() } } } })
    });
}

function renderPage() {
    const store = makeStore();
    const { container } = render(
        <Provider store={store}>
            <MemoryRouter>
                <TooltipProvider>
                    <ProfilePage />
                </TooltipProvider>
            </MemoryRouter>
        </Provider>
    );
    return { store, container };
}

describe('ProfilePage (desktop)', () => {
    beforeEach(() => {
        mockGet.mockImplementation((url: string) => {
            if (url.includes('/profile/')) return Promise.resolve({ data: PROFILE_DATA });
            if (url.includes('/quizzes')) return Promise.resolve({ data: [] });
            return Promise.resolve({ data: null });
        });
    });

    describe('loading/skeleton state', () => {
        it('shows skeleton while data is loading', () => {
            mockGet.mockReturnValue(new Promise(() => {}));
            const { container } = renderPage();
            expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
        });

        it('shows skeleton when profileData has not loaded yet', async () => {
            // Only quizzes resolves; profile never resolves → profileData stays undefined
            mockGet.mockImplementation((url: string) => {
                if (url.includes('/quizzes')) return Promise.resolve({ data: [] });
                return new Promise(() => {}); // profile never resolves
            });
            const { container } = renderPage();
            // Skeleton is visible immediately (pending fires synchronously)
            expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
        });
    });

    describe('with profile data', () => {
        it('shows display name from profileData', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Алиса Иванова')).toBeInTheDocument();
            });
        });

        it('shows user email', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('alice@mail.ru')).toBeInTheDocument();
            });
        });

        it('shows registration date badge', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText(/Дата регистрации/)).toBeInTheDocument();
            });
        });

        it('shows "Редактировать" button', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByRole('button', { name: 'Редактировать' })).toBeInTheDocument();
            });
        });

        it('shows stat cards', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('Создано')).toBeInTheDocument();
            });
            expect(screen.getByText('Опубликовано')).toBeInTheDocument();
            expect(screen.getByText('Черновики')).toBeInTheDocument();
            expect(screen.getByText('Прохождений')).toBeInTheDocument();
        });

        it('shows username as display name when firstName and lastName are empty', async () => {
            const emptyProfile = { ...PROFILE_DATA, firstName: '', lastName: '' };
            mockGet.mockImplementation((url: string) => {
                if (url.includes('/profile/')) return Promise.resolve({ data: emptyProfile });
                if (url.includes('/quizzes')) return Promise.resolve({ data: [] });
                return Promise.resolve({ data: null });
            });
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('alice')).toBeInTheDocument();
            });
        });

        it('shows initials in avatar when no avatarUrl', async () => {
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('АИ')).toBeInTheDocument();
            });
        });
    });

    describe('stat cards with quizzes', () => {
        it('shows correct created count', async () => {
            const quizzes = [
                { id: 'q1', title: 'Q1', isPublished: true, attemptsCount: 5, createdAt: '', userId: 'u1', description: '' },
                { id: 'q2', title: 'Q2', isPublished: false, attemptsCount: 2, createdAt: '', userId: 'u1', description: '' }
            ];
            mockGet.mockImplementation((url: string) => {
                if (url.includes('/profile/')) return Promise.resolve({ data: PROFILE_DATA });
                if (url.includes('/quizzes')) return Promise.resolve({ data: quizzes });
                return Promise.resolve({ data: null });
            });
            renderPage();
            await waitFor(() => {
                expect(screen.getByText('2')).toBeInTheDocument();
            });
        });
    });
});
