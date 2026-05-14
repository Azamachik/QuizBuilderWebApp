import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from 'sonner';
import { Button } from '../Button/Button';
import { Toaster } from './Sonner';

const meta = {
    title: 'Shared/Sonner',
    component: Toaster,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [
        (Story) => (
            <>
                <Story />
                <Toaster position='top-center' richColors closeButton />
            </>
        )
    ]
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    render: () => (
        <Button variant='action' onClick={() => toast.success('Изменения сохранены')}>
            Показать Success
        </Button>
    )
};

export const Error: Story = {
    render: () => (
        <Button variant='destructive' onClick={() => toast.error('Ошибка при сохранении')}>
            Показать Error
        </Button>
    )
};

export const Info: Story = {
    render: () => (
        <Button variant='outline' onClick={() => toast.info('Тест опубликован')}>
            Показать Info
        </Button>
    )
};

export const AllTypes: Story = {
    render: () => (
        <div className='flex flex-wrap gap-2'>
            <Button variant='action' onClick={() => toast.success('Сохранено')}>
                Success
            </Button>
            <Button variant='destructive' onClick={() => toast.error('Ошибка')}>
                Error
            </Button>
            <Button variant='outline' onClick={() => toast.info('Инфо')}>
                Info
            </Button>
            <Button variant='ghost' onClick={() => toast.warning('Предупреждение')}>
                Warning
            </Button>
            <Button variant='secondary' onClick={() => toast('Обычное уведомление')}>
                Default
            </Button>
        </div>
    )
};
