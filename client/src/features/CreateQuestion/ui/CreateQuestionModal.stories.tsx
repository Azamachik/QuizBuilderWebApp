import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { CreateQuestionModal } from './CreateQuestionModal';

const meta = {
    title: 'Features/CreateQuestion/CreateQuestionModal',
    component: CreateQuestionModal,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    args: { onSave: fn() },
} satisfies Meta<typeof CreateQuestionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateMode: Story = {
    args: { open: false, onOpenChange: () => {} },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant='action' onClick={() => setOpen(true)}>Добавить вопрос</Button>
                <CreateQuestionModal {...args} open={open} onOpenChange={setOpen} />
            </>
        );
    },
};

export const EditMode: Story = {
    args: { open: false, onOpenChange: () => {} },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant='outline' onClick={() => setOpen(true)}>Редактировать вопрос</Button>
                <CreateQuestionModal
                    {...args}
                    open={open}
                    onOpenChange={setOpen}
                    title='Редактировать вопрос'
                    initialData={{
                        text: 'Что такое Закон Фиттса?',
                        type: 'single',
                        required: true,
                        options: [
                            { id: 'a', text: 'Чем дальше и меньше цель', isCorrect: true },
                            { id: 'b', text: 'Время зависит от вариантов', isCorrect: false },
                        ],
                    }}
                />
            </>
        );
    },
};

export const AlwaysOpen: Story = {
    args: { open: true, onOpenChange: () => {} },
};
