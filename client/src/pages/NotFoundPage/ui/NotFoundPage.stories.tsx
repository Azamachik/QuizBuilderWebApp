import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotFoundPage } from './NotFoundPage';
import { BrowserDecorator } from '@/shared/config/storybook/decorators/BrowserDecorator';

const meta = {
    title: 'Pages/NotFoundPage',
    component: NotFoundPage,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [BrowserDecorator],
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
