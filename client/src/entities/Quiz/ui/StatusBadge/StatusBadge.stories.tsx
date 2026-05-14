import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { StatusBadge } from './StatusBadge';
import { TooltipDecorator } from '@/shared/config/storybook/decorators/TooltipDecorator';

const meta = {
    title: 'Entities/Quiz/StatusBadge',
    component: StatusBadge,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [TooltipDecorator],
    argTypes: {
        status: { control: 'boolean' },
        onClick: { action: 'clicked' }
    }
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Published: Story = { args: { status: true, onClick: fn() } };
export const Draft: Story = { args: { status: false, onClick: fn() } };
export const StaticPublished: Story = { args: { status: true } };
export const StaticDraft: Story = { args: { status: false } };

export const Both: Story = {
    args: { status: true },
    render: () => (
        <div className='flex items-center gap-4'>
            <StatusBadge status={true} />
            <StatusBadge status={false} />
        </div>
    )
};
