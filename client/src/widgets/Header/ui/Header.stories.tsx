import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { TooltipDecorator } from '@/shared/config/storybook/decorators/TooltipDecorator';
import { BrowserDecorator } from '@/shared/config/storybook/decorators/BrowserDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const meta = {
    title: 'Widgets/Header',
    component: Header,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [BrowserDecorator, TooltipDecorator]
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Guest: Story = {
    decorators: [StoreDecorator({ user: { authData: undefined, _inited: true } })]
};

export const Authenticated: Story = {
    decorators: [
        StoreDecorator({
            user: { authData: { id: '1', username: 'Азамат', email: 'root@mail.ru', token: 'token_admin' }, _inited: true }
        })
    ]
};
