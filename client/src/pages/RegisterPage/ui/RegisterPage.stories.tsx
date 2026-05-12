import type { Meta, StoryObj } from '@storybook/react-vite';
import RegisterPage from './RegisterPage';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { BrowserDecorator } from '@/shared/config/storybook/decorators/BrowserDecorator';

const meta = {
    title: 'Pages/RegisterPage',
    component: RegisterPage,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [BrowserDecorator],
} satisfies Meta<typeof RegisterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [StoreDecorator({ user: { authData: undefined, _inited: true }, register: { username: '', email: '', password: '', confirm: '', isLoading: false } })],
};

export const Loading: Story = {
    decorators: [StoreDecorator({ user: { authData: undefined, _inited: true }, register: { username: 'user', email: 'u@mail.ru', password: '1234', confirm: '1234', isLoading: true } })],
};

export const WithError: Story = {
    decorators: [StoreDecorator({ user: { authData: undefined, _inited: true }, register: { username: '', email: '', password: '', confirm: '', isLoading: false, error: 'Пользователь с таким email уже существует' } })],
};
