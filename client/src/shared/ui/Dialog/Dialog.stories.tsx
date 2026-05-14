import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './Dialog';

const meta = {
    title: 'Shared/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant='action' onClick={() => setOpen(true)}>
                    Открыть диалог
                </Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Редактировать тест</DialogTitle>
                        </DialogHeader>
                        <p className='text-sm text-muted-foreground'>
                            Содержимое модального окна. Нажмите × или кликните снаружи, чтобы закрыть.
                        </p>
                        <div className='flex justify-end gap-2 pt-2'>
                            <Button variant='outline' onClick={() => setOpen(false)}>
                                Отмена
                            </Button>
                            <Button variant='action' onClick={() => setOpen(false)}>
                                Сохранить
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }
};

export const WithForm: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    Создать тест
                </Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Новый тест</DialogTitle>
                        </DialogHeader>
                        <div className='space-y-3'>
                            <input
                                className='w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none'
                                placeholder='Название теста'
                            />
                            <textarea
                                className='w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none'
                                rows={3}
                                placeholder='Описание (необязательно)'
                            />
                        </div>
                        <div className='flex justify-end gap-2 pt-2'>
                            <Button variant='outline' onClick={() => setOpen(false)}>
                                Отмена
                            </Button>
                            <Button variant='action' onClick={() => setOpen(false)}>
                                Создать
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }
};

export const AlwaysOpen: Story = {
    render: () => (
        <Dialog open>
            <DialogContent className='static translate-x-0 translate-y-0 shadow-none'>
                <DialogHeader>
                    <DialogTitle>Всегда открыт</DialogTitle>
                </DialogHeader>
                <p className='text-sm text-muted-foreground'>Диалог в статическом режиме для Storybook.</p>
            </DialogContent>
        </Dialog>
    )
};
