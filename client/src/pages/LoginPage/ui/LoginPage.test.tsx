import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { loginReducer } from '@/features/AuthByEmail';
import LoginPage from './LoginPage';

vi.mock('@/shared/assets/icons/favicon.svg?react', () => ({ default: () => null }));
vi.mock('@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader', () => ({
    useDynamicModuleLoader: vi.fn()
}));

const mockApi = {
    post: vi.fn().mockResolvedValue({
        data: { id: 'u1', username: 'user', token: 'tok' }
    })
};

function renderPage() {
    const store = configureStore({
        reducer: { user: userReducer, login: loginReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api: mockApi } } })
    });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        </Provider>
    );
    return { store };
}

describe('LoginPage', () => {
    it('renders heading "Вход в систему"', () => {
        renderPage();
        expect(screen.getByText('Вход в систему')).toBeInTheDocument();
    });

    it('renders the login form with email input', () => {
        renderPage();
        expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
    });

    it('renders social login buttons (Яндекс, VK)', () => {
        renderPage();
        expect(screen.getByText('Я')).toBeInTheDocument();
        expect(screen.getByText('VK')).toBeInTheDocument();
    });

    it('shows warning dialog when social login button is clicked', async () => {
        renderPage();
        await userEvent.click(screen.getByText('Я'));
        expect(screen.getByText('Сервис временно недоступен')).toBeInTheDocument();
    });

    it('renders link to register page', () => {
        renderPage();
        expect(screen.getByRole('link', { name: 'Зарегистрироваться' })).toBeInTheDocument();
    });
});
