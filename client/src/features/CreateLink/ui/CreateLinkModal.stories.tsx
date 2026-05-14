import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { CreateLinkModal } from './CreateLinkModal';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const meta = {
    title: 'Features/CreateLink/CreateLinkModal',
    component: CreateLinkModal,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [StoreDecorator({ user: { authData: { id: '1', username: 'admin', token: 'token' }, _inited: true } })]
} satisfies Meta<typeof CreateLinkModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { quizId: '1', open: false, onOpenChange: () => {} },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    Создать ссылку
                </Button>
                <CreateLinkModal {...args} quizId='1' open={open} onOpenChange={setOpen} />
            </>
        );
    }
};

export const AlwaysOpen: Story = {
    args: { quizId: '1', open: true, onOpenChange: () => {} }
};
