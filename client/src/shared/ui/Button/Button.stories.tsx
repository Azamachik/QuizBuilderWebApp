import type { Meta, StoryObj } from '@storybook/react-vite';
import { Save } from 'lucide-react';
import { Button } from './Button';

const meta = {
    title: 'Shared/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'action', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
        },
        size: {
            control: 'select',
            options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
        },
        disabled: { control: 'boolean' },
    },
    args: { children: 'Button' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: 'default' } };
export const Action: Story = { args: { variant: 'action', children: 'Сохранить' } };
export const Outline: Story = { args: { variant: 'outline', children: 'Отмена' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Подробнее' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Удалить' } };
export const Link: Story = { args: { variant: 'link', children: 'Перейти' } };
export const Disabled: Story = { args: { variant: 'action', disabled: true, children: 'Недоступно' } };

export const WithIcon: Story = {
    args: { variant: 'outline', children: undefined },
    render: (args) => (
        <Button {...args}>
            <Save className='size-4' /> Сохранить
        </Button>
    ),
};

export const SizeLg: Story = { args: { size: 'lg', variant: 'action', children: 'Начать' } };
export const SizeSm: Story = { args: { size: 'sm', children: 'Маленький' } };
export const SizeXs: Story = { args: { size: 'xs', children: 'Tiny' } };

export const AllVariants: Story = {
    name: 'All Variants',
    render: () => (
        <div className='flex flex-wrap items-center gap-3'>
            {(['default', 'action', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const).map((v) => (
                <Button key={v} variant={v}>{v}</Button>
            ))}
        </div>
    ),
};
