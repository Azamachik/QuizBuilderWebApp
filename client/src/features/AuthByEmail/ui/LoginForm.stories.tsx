import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginForm } from './LoginForm';
import { BrowserDecorator } from '@/shared/config/storybook/decorators/BrowserDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const meta = {
    title: 'Features/AuthByEmail/LoginForm',
    component: LoginForm,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [BrowserDecorator]
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [
        StoreDecorator({
            user: { authData: undefined, _inited: true },
            login: { email: '', password: '', isLoading: false }
        })
    ]
};

export const Loading: Story = {
    decorators: [
        StoreDecorator({
            user: { authData: undefined, _inited: true },
            login: { email: 'root@mail.ru', password: '1234', isLoading: true }
        })
    ]
};

export const WithError: Story = {
    decorators: [
        StoreDecorator({
            user: { authData: undefined, _inited: true },
            login: { email: 'wrong@mail.ru', password: 'bad', isLoading: false, error: 'Неверный логин или пароль' }
        })
    ]
};
