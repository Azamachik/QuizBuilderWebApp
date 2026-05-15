import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { registerReducer } from '@/features/RegisterByEmail';
import RegisterPage from './RegisterPage';

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
        reducer: { user: userReducer, register: registerReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api: mockApi } } })
    });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        </Provider>
    );
    return { store };
}

describe('RegisterPage', () => {
    it('renders heading "Регистрация в системе"', () => {
        renderPage();
        expect(screen.getByText('Регистрация в системе')).toBeInTheDocument();
    });

    it('renders the register form with username input', () => {
        renderPage();
        expect(screen.getByPlaceholderText('root')).toBeInTheDocument();
    });

    it('renders "Зарегистрироваться" submit button', () => {
        renderPage();
        expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument();
    });

    it('renders link to login page', () => {
        renderPage();
        expect(screen.getByRole('link', { name: 'Войти' })).toBeInTheDocument();
    });
});
