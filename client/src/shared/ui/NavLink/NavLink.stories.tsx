import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { NavLink } from './NavLink';

const meta = {
    title: 'Shared/NavLink',
    component: NavLink,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={['/quizzes']}>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
    args: { to: '/quizzes', children: 'Мои тесты' },
};

export const Inactive: Story = {
    args: { to: '/profile', children: 'Профиль' },
};

export const NavBar: Story = {
    args: { to: '/quizzes', children: 'Мои тесты' },
    render: () => (
        <nav className='flex items-center gap-6 rounded-xl border border-border p-4'>
            <NavLink to='/quizzes'>Мои тесты</NavLink>
            <NavLink to='/profile'>Профиль</NavLink>
            <NavLink to='/settings'>Настройки</NavLink>
        </nav>
    ),
};
