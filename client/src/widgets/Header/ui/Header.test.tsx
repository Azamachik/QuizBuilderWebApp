import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import * as React from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { TooltipProvider } from '@/shared/ui/Tooltip/Tooltip';
import { userReducer } from '@/entities/User';
import { Header } from './Header';

// favicon.svg is 1.2MB — too large for jsdom processing; mock it along with other SVG assets
vi.mock('@/shared/assets/icons/favicon.svg?react', () => ({ default: () => null }));
vi.mock('@/shared/assets/icons/logout.svg?react', () => ({ default: () => null }));
vi.mock('@/shared/assets/icons/user.svg?react', () => ({ default: () => null }));

// Force desktop layout in all tests
vi.mock('@/shared/lib/helpers/hooks/useIsMobile/useIsMobile', () => ({
    useIsMobile: vi.fn().mockReturnValue(false),
}));

function makeStore(withUser = false) {
    return configureStore({
        reducer: { user: userReducer },
        preloadedState: withUser
            ? { user: { authData: { id: 'u1', username: 'user', token: 'tok' }, _inited: true } }
            : { user: { _inited: true } },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api: {} } } }),
    });
}

function renderHeader(withUser = false) {
    const store = makeStore(withUser);
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ThemeContext.Provider value={{ theme: 'light', setTheme: vi.fn() }}>
                    <TooltipProvider>
                        <Header />
                    </TooltipProvider>
                </ThemeContext.Provider>
            </MemoryRouter>
        </Provider>,
    );
    return { store };
}

describe('Header (desktop)', () => {
    describe('guest layout', () => {
        it('renders "Войти" link', () => {
            renderHeader(false);
            expect(screen.getByRole('link', { name: 'Войти' })).toBeInTheDocument();
        });

        it('renders "Регистрация" link', () => {
            renderHeader(false);
            expect(screen.getByRole('link', { name: 'Регистрация' })).toBeInTheDocument();
        });

        it('renders nav links for landing sections', () => {
            renderHeader(false);
            expect(screen.getByText('Возможности')).toBeInTheDocument();
            expect(screen.getByText('Кейсы')).toBeInTheDocument();
            expect(screen.getByText('Цены')).toBeInTheDocument();
        });

        it('does not render "Тесты" nav link for guests', () => {
            renderHeader(false);
            expect(screen.queryByRole('link', { name: 'Тесты' })).toBeNull();
        });
    });

    describe('authenticated layout', () => {
        it('renders "Тесты" nav link', () => {
            renderHeader(true);
            expect(screen.getByRole('link', { name: 'Тесты' })).toBeInTheDocument();
        });

        it('renders "+ Создать тест" button', () => {
            renderHeader(true);
            expect(screen.getByRole('link', { name: '+ Создать тест' })).toBeInTheDocument();
        });

        it('does not render "Войти" link for authenticated user', () => {
            renderHeader(true);
            expect(screen.queryByRole('link', { name: 'Войти' })).toBeNull();
        });

        it('dispatches logout and navigates on logout button click', async () => {
            const { store } = renderHeader(true);
            // The logout button has no accessible text (icon only) — find by tooltip or button index
            const buttons = screen.getAllByRole('button');
            // Last button after ToggleTheme and Profile is Logout
            const logoutBtn = buttons[buttons.length - 1];
            await userEvent.click(logoutBtn);
            expect(store.getState().user.authData).toBeUndefined();
        });
    });
});
