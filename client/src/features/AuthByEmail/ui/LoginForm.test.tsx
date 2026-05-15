import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { loginReducer } from '../model/slice/loginSlice';
import { LoginForm } from './LoginForm';

// useDynamicModuleLoader requires a store with reducerManager — mock it so the form
// can be rendered with a plain configureStore in tests.
vi.mock('@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader', () => ({
    useDynamicModuleLoader: vi.fn()
}));

const mockApi = {
    post: vi.fn().mockResolvedValue({
        data: { id: 'u1', username: 'user', email: 'u@mail.ru', token: 'tok' }
    })
};

function makeStore(loginState = {}) {
    return configureStore({
        reducer: { user: userReducer, login: loginReducer },
        preloadedState: loginState ? { login: { email: '', password: '', isLoading: false, ...loginState } } : undefined,
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api: mockApi } } })
    });
}

function renderForm(loginState = {}) {
    const store = makeStore(loginState);
    const { container } = render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        </Provider>
    );
    return { store, container };
}

describe('LoginForm', () => {
    describe('rendering', () => {
        it('renders email input', () => {
            renderForm();
            expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
        });

        it('renders password input', () => {
            const { container } = renderForm();
            expect(container.querySelector('input[type="password"]')).toBeInTheDocument();
        });

        it('renders submit button with "Продолжить" label', () => {
            renderForm();
            expect(screen.getByRole('button', { name: 'Продолжить' })).toBeInTheDocument();
        });

        it('shows error message when error is in state', () => {
            renderForm({ error: 'Неверный email или пароль' });
            expect(screen.getByText('Неверный email или пароль')).toBeInTheDocument();
        });

        it('shows "Вход..." and disables button while loading', () => {
            renderForm({ isLoading: true });
            expect(screen.getByRole('button', { name: 'Вход...' })).toBeDisabled();
        });
    });

    describe('interaction', () => {
        it('updates email input when typing', async () => {
            renderForm();
            const emailInput = screen.getByPlaceholderText('name@example.com') as HTMLInputElement;
            await userEvent.type(emailInput, 'test@mail.ru');
            expect(emailInput.value).toBe('test@mail.ru');
        });

        it('calls loginByEmail API on form submit', async () => {
            const { container } = renderForm();
            await userEvent.type(screen.getByPlaceholderText('name@example.com'), 'u@mail.ru');
            const passwordInput = container.querySelector('input[type="password"]') as HTMLInputElement;
            await userEvent.type(passwordInput, 'secret');
            await userEvent.click(screen.getByRole('button', { name: 'Продолжить' }));
            expect(mockApi.post).toHaveBeenCalledWith('/login', { email: 'u@mail.ru', password: 'secret' });
        });
    });
});
