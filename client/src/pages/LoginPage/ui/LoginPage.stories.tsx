import type { Meta, StoryObj } from '@storybook/react-vite';
import LoginPage from './LoginPage';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { BrowserDecorator } from '@/shared/config/storybook/decorators/BrowserDecorator';

const meta = {
    title: 'Pages/LoginPage',
    component: LoginPage,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [BrowserDecorator],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [StoreDecorator({ user: { authData: undefined, _inited: true }, login: { email: '', password: '', isLoading: false } })],
};

export const Loading: Story = {
    decorators: [StoreDecorator({ user: { authData: undefined, _inited: true }, login: { email: '', password: '', isLoading: true } })],
};

export const WithError: Story = {
    decorators: [StoreDecorator({ user: { authData: undefined, _inited: true }, login: { email: 'bad@mail.ru', password: 'wrong', isLoading: false, error: 'Неверный логин или пароль' } })],
};
