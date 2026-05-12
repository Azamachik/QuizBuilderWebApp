import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from './StatCard';

const meta = {
    title: 'Shared/StatCard',
    component: StatCard,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    argTypes: {
        highlight: { control: 'boolean' },
        progress: { control: { type: 'range', min: 0, max: 100 } },
    },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 42, label: 'Создано' } };
export const Highlighted: Story = { args: { value: '94%', label: 'Средний результат', highlight: true, progress: 94 } };
export const WithProgress: Story = { args: { value: 38, label: 'Опубликовано', progress: 76 } };
export const ZeroValue: Story = { args: { value: 0, label: 'Черновики' } };
export const StringValue: Story = { args: { value: '—', label: 'Средний результат' } };

export const AllStats: Story = {
    args: { value: 42, label: 'Создано' },
    render: () => (
        <div className='grid grid-cols-5 gap-3'>
            <StatCard value={42} label='Создано' />
            <StatCard value={38} label='Опубликовано' />
            <StatCard value={4} label='Черновики' />
            <StatCard value={128} label='Прохождений' />
            <StatCard value='94%' label='Средний результат' highlight progress={94} />
        </div>
    ),
};
