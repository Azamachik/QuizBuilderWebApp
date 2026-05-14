import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActivityHeatmap } from './ActivityHeatmap';
import { TooltipDecorator } from '@/shared/config/storybook/decorators/TooltipDecorator';

function daysAgo(n: number): string {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString();
}

const sparseDates = [
    daysAgo(3),
    daysAgo(10),
    daysAgo(10),
    daysAgo(25),
    daysAgo(40),
    daysAgo(40),
    daysAgo(40),
    daysAgo(60),
    daysAgo(75),
    daysAgo(90)
];

const activeDates = Array.from({ length: 60 }, (_, i) => (i % 3 === 0 || i % 7 === 0 ? daysAgo(i) : null)).filter(Boolean) as string[];

const veryActiveDates = Array.from({ length: 200 }, () => daysAgo(Math.floor(Math.random() * 365)));

const meta = {
    title: 'Pages/ProfilePage/ActivityHeatmap',
    component: ActivityHeatmap,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    decorators: [
        TooltipDecorator,
        (Story) => (
            <div className='max-w-4xl'>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof ActivityHeatmap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { quizDates: [] } };
export const Sparse: Story = { args: { quizDates: sparseDates } };
export const Active: Story = { args: { quizDates: activeDates } };
export const VeryActive: Story = { args: { quizDates: veryActiveDates } };

export const RecentBurst: Story = {
    args: {
        quizDates: Array.from({ length: 15 }, (_, i) => daysAgo(i))
    }
};
