import type { Meta, StoryObj } from '@storybook/react-vite';
import { RegisterForm } from './RegisterForm';
import { BrowserDecorator } from '@/shared/config/storybook/decorators/BrowserDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const meta = {
    title: 'Features/RegisterByEmail/RegisterForm',
    component: RegisterForm,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [BrowserDecorator],
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [StoreDecorator({
        user: { authData: undefined, _inited: true },
        register: { username: '', email: '', password: '', confirm: '', isLoading: false },
    })],
};

export const Loading: Story = {
    decorators: [StoreDecorator({
        user: { authData: undefined, _inited: true },
        register: { username: 'newuser', email: 'new@mail.ru', password: '1234', confirm: '1234', isLoading: true },
    })],
};

export const WithError: Story = {
    decorators: [StoreDecorator({
        user: { authData: undefined, _inited: true },
        register: { username: '', email: '', password: '', confirm: '', isLoading: false, error: 'Пользователь с таким email уже существует' },
    })],
};
