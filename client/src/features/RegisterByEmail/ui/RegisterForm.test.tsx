import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { registerReducer } from '../model/slice/registerSlice';
import { RegisterForm } from './RegisterForm';

vi.mock('@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader', () => ({
    useDynamicModuleLoader: vi.fn(),
}));

const mockApi = {
    post: vi.fn().mockResolvedValue({
        data: { id: 'u1', username: 'newuser', email: 'new@mail.ru', token: 'tok' },
    }),
};

function makeStore(registerState = {}) {
    return configureStore({
        reducer: { user: userReducer, register: registerReducer },
        preloadedState: {
            register: { username: '', email: '', password: '', confirm: '', isLoading: false, ...registerState },
        },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api: mockApi } } }),
    });
}

function renderForm(registerState = {}) {
    const store = makeStore(registerState);
    const { container } = render(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterForm />
            </MemoryRouter>
        </Provider>,
    );
    // Helpers for password inputs (labels are not associated via "for" attr)
    const getPasswordInputs = () => container.querySelectorAll('input[type="password"]');
    return { store, container, getPasswordInputs };
}

describe('RegisterForm', () => {
    describe('rendering', () => {
        it('renders username input', () => {
            renderForm();
            expect(screen.getByPlaceholderText('root')).toBeInTheDocument();
        });

        it('renders email input', () => {
            renderForm();
            expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
        });

        it('renders two password inputs', () => {
            const { getPasswordInputs } = renderForm();
            expect(getPasswordInputs().length).toBe(2);
        });

        it('shows submit button', () => {
            renderForm();
            expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument();
        });

        it('shows "Регистрация..." and disables button while loading', () => {
            renderForm({ isLoading: true });
            expect(screen.getByRole('button', { name: 'Регистрация...' })).toBeDisabled();
        });

        it('shows error message when error is in state', () => {
            renderForm({ error: 'Email уже занят' });
            expect(screen.getByText('Email уже занят')).toBeInTheDocument();
        });
    });

    describe('password mismatch validation', () => {
        it('shows mismatch warning when passwords differ', async () => {
            const { getPasswordInputs } = renderForm();
            const [passwordInput, confirmInput] = Array.from(getPasswordInputs());
            await userEvent.type(passwordInput, 'abc123');
            await userEvent.type(confirmInput, 'xyz999');
            expect(screen.getByText('Пароли не совпадают')).toBeInTheDocument();
        });

        it('disables submit button when passwords do not match', async () => {
            const { getPasswordInputs } = renderForm();
            const [passwordInput, confirmInput] = Array.from(getPasswordInputs());
            await userEvent.type(passwordInput, 'abc');
            await userEvent.type(confirmInput, 'xyz');
            expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeDisabled();
        });
    });

    describe('interaction', () => {
        it('calls registerByEmail API when passwords match and form is submitted', async () => {
            const { getPasswordInputs } = renderForm();
            await userEvent.type(screen.getByPlaceholderText('root'), 'alice');
            await userEvent.type(screen.getByPlaceholderText('name@example.com'), 'a@b.ru');
            const [passwordInput, confirmInput] = Array.from(getPasswordInputs());
            await userEvent.type(passwordInput, 'pass123');
            await userEvent.type(confirmInput, 'pass123');
            await userEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));
            expect(mockApi.post).toHaveBeenCalledWith(
                '/register',
                expect.objectContaining({ username: 'alice', email: 'a@b.ru', password: 'pass123' }),
            );
        });
    });
});
