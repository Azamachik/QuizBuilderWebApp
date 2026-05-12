import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
    title: 'Shared/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { className: 'h-4 w-48' } };
export const Circle: Story = { args: { className: 'h-12 w-12 rounded-full' } };
export const Card: Story = { args: { className: 'h-32 w-64 rounded-2xl' } };

export const TextBlock: Story = {
    render: () => (
        <div className='w-80 space-y-2'>
            <Skeleton className='h-6 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
            <Skeleton className='h-4 w-2/3' />
        </div>
    ),
};

export const QuizCardSkeleton: Story = {
    render: () => (
        <div className='w-72 space-y-4 rounded-2xl border border-border p-5'>
            <div className='flex items-center justify-between'>
                <Skeleton className='h-10 w-10 rounded-xl' />
                <Skeleton className='h-6 w-20 rounded-full' />
            </div>
            <div className='space-y-2'>
                <Skeleton className='h-5 w-3/4' />
                <Skeleton className='h-4 w-1/3' />
            </div>
            <div className='flex gap-4'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-24' />
            </div>
        </div>
    ),
};

export const ProfileSkeleton: Story = {
    render: () => (
        <div className='flex w-96 items-center gap-4'>
            <Skeleton className='h-16 w-16 rounded-2xl' />
            <div className='flex-1 space-y-2'>
                <Skeleton className='h-6 w-40' />
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-28 rounded-lg' />
            </div>
        </div>
    ),
};
