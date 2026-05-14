import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarIcon } from 'lucide-react';
import { Button } from '../Button/Button';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const meta = {
    title: 'Shared/Popover',
    component: Popover,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline'>Открыть</Button>
            </PopoverTrigger>
            <PopoverContent className='p-4'>
                <p className='text-sm font-semibold'>Заголовок</p>
                <p className='mt-1 text-xs text-muted-foreground'>Содержимое всплывающего окна.</p>
            </PopoverContent>
        </Popover>
    )
};

export const DatePicker: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger asChild>
                <button className='flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground'>
                    <CalendarIcon className='size-4' />
                    Выберите дату
                </button>
            </PopoverTrigger>
            <PopoverContent className='p-4 w-64'>
                <p className='text-xs text-muted-foreground'>Здесь будет Calendar компонент</p>
            </PopoverContent>
        </Popover>
    )
};

export const WithForm: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline'>Настройки</Button>
            </PopoverTrigger>
            <PopoverContent className='p-4 w-64 space-y-3'>
                <p className='text-sm font-semibold'>Быстрые настройки</p>
                <input
                    className='w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none'
                    placeholder='Лимит использований'
                    type='number'
                />
                <Button variant='action' className='w-full' size='sm'>
                    Применить
                </Button>
            </PopoverContent>
        </Popover>
    )
};
