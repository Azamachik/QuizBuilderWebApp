import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleTheme } from './ToggleTheme';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const meta = {
    title: 'Features/ToggleTheme',
    component: ToggleTheme,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [StoreDecorator({ user: { authData: undefined, _inited: true } })],
} satisfies Meta<typeof ToggleTheme>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
