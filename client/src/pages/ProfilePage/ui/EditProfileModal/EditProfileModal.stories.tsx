import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { EditProfileModal } from './EditProfileModal';

const mockProfile = {
    id: '1',
    firstName: 'Азамат',
    lastName: 'Каримов',
    avatarUrl: '',
    createdAt: '12.10.2023',
};

const meta = {
    title: 'Pages/ProfilePage/EditProfileModal',
    component: EditProfileModal,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    args: { onSave: fn() },
} satisfies Meta<typeof EditProfileModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { open: false, onOpenChange: () => {}, initialData: mockProfile },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant='action' onClick={() => setOpen(true)}>Редактировать профиль</Button>
                <EditProfileModal {...args} open={open} onOpenChange={setOpen} initialData={mockProfile} />
            </>
        );
    },
};

export const AlwaysOpen: Story = {
    args: { open: true, onOpenChange: () => {}, initialData: mockProfile },
};

export const WithAvatar: Story = {
    args: {
        open: true,
        onOpenChange: () => {},
        initialData: {
            ...mockProfile,
            avatarUrl: 'https://avatars.mds.yandex.net/i?id=173df4e04c7b771f188bb66f67851589-5652956-images-thumbs&n=13',
        },
    },
};
