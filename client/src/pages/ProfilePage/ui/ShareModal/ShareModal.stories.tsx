import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { ShareModal } from './ShareModal';

const meta = {
    title: 'Pages/ProfilePage/ShareModal',
    component: ShareModal,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
} satisfies Meta<typeof ShareModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { open: false, onOpenChange: () => {}, username: 'azamat.karimov' },
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    Поделиться профилем
                </Button>
                <ShareModal open={open} onOpenChange={setOpen} username='azamat.karimov' />
            </>
        );
    }
};

export const AlwaysOpen: Story = {
    args: { open: true, onOpenChange: () => {}, username: 'azamat.karimov' }
};

export const LongUsername: Story = {
    args: { open: true, onOpenChange: () => {}, username: 'very-long-username-that-might-overflow' }
};
