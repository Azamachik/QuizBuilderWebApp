import type { Meta, StoryObj } from '@storybook/react-vite';
import LandingPage from './LandingPage';
import { BrowserDecorator } from '@/shared/config/storybook/decorators/BrowserDecorator';

const meta = {
    title: 'Pages/LandingPage',
    component: LandingPage,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [BrowserDecorator],
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
