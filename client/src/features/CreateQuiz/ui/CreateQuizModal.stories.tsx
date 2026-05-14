import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { CreateQuizModal } from './CreateQuizModal';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const authState = { user: { authData: { id: '1', username: 'admin', token: 'token' }, _inited: true } };

const meta = {
    title: 'Features/CreateQuiz/CreateQuizModal',
    component: CreateQuizModal,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [StoreDecorator(authState)]
} satisfies Meta<typeof CreateQuizModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { open: false, onOpenChange: () => {} },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant='action' onClick={() => setOpen(true)}>
                    Создать тест
                </Button>
                <CreateQuizModal {...args} open={open} onOpenChange={setOpen} />
            </>
        );
    }
};

export const AlwaysOpen: Story = {
    args: { open: true, onOpenChange: () => {} }
};
