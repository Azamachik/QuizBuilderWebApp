import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';

const meta = {
    title: 'Shared/Progress',
    component: Progress,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    argTypes: {
        value: { control: { type: 'range', min: 0, max: 100 } },
    },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 60, className: 'w-72' } };
export const Empty: Story = { args: { value: 0, className: 'w-72' } };
export const Full: Story = { args: { value: 100, className: 'w-72' } };
export const Quarter: Story = { args: { value: 25, className: 'w-72' } };

export const AllLevels: Story = {
    render: () => (
        <div className='flex w-72 flex-col gap-3'>
            {[0, 25, 50, 75, 100].map((v) => (
                <div key={v} className='flex items-center gap-3'>
                    <span className='w-8 text-right text-xs text-muted-foreground'>{v}%</span>
                    <Progress value={v} className='flex-1' />
                </div>
            ))}
        </div>
    ),
};

export const Thin: Story = { args: { value: 70, className: 'h-1 w-72' } };
export const Thick: Story = { args: { value: 70, className: 'h-4 w-72' } };
