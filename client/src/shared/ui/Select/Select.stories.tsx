import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';

const meta = {
    title: 'Shared/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Select>
            <SelectTrigger className='w-48'>
                <SelectValue placeholder='Выберите тип' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='single'>Один вариант</SelectItem>
                <SelectItem value='multiple'>Несколько вариантов</SelectItem>
                <SelectItem value='text'>Текстовый ответ</SelectItem>
            </SelectContent>
        </Select>
    ),
};

export const WithDefaultValue: Story = {
    render: () => (
        <Select defaultValue='single'>
            <SelectTrigger className='w-48'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='single'>Один вариант</SelectItem>
                <SelectItem value='multiple'>Несколько вариантов</SelectItem>
                <SelectItem value='text'>Текстовый ответ</SelectItem>
            </SelectContent>
        </Select>
    ),
};

export const Disabled: Story = {
    render: () => (
        <Select disabled>
            <SelectTrigger className='w-48'>
                <SelectValue placeholder='Недоступно' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='single'>Один вариант</SelectItem>
            </SelectContent>
        </Select>
    ),
};
