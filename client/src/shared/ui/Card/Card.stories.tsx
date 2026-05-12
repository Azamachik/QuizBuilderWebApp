import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta = {
    title: 'Shared/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Card className='w-72 p-5'>
            <p className='font-semibold'>Заголовок карточки</p>
            <p className='mt-1 text-sm text-muted-foreground'>Описание или дополнительный текст.</p>
        </Card>
    ),
};

export const WithStats: Story = {
    render: () => (
        <Card className='w-72 p-5'>
            <div className='mb-3 flex items-center justify-between'>
                <p className='font-semibold'>UX/UI Quiz</p>
                <span className='rounded-full bg-action/10 px-2 py-0.5 text-xs text-action'>Опубликован</span>
            </div>
            <p className='text-sm text-muted-foreground'>12 окт. 2023</p>
            <div className='mt-3 flex gap-4 text-sm text-muted-foreground'>
                <span>5 вопросов</span>
                <span>1 240 прохождений</span>
            </div>
        </Card>
    ),
};

export const Interactive: Story = {
    render: () => (
        <Card className='w-72 cursor-pointer p-5 transition-shadow hover:shadow-md'>
            <p className='font-semibold'>Кликабельная карточка</p>
            <p className='mt-1 text-sm text-muted-foreground'>Наведите мышь для hover-эффекта.</p>
        </Card>
    ),
};
