import type { Meta, StoryObj } from '@storybook/react-vite';
import { Edit, Link2, MoreHorizontal, Trash2 } from 'lucide-react';
import { Button } from '../Button/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from './DropdownMenu';

const meta = {
    title: 'Shared/DropdownMenu',
    component: DropdownMenu,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                    <MoreHorizontal className='size-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Действия</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Edit className='size-4' /> Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link2 className='size-4' /> Создать ссылку
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant='destructive'>
                    <Trash2 className='size-4' /> Удалить
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};

export const WithCheckboxes: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>Фильтры</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Статус</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Опубликованные</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Черновики</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};

export const WithShortcuts: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>Меню</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    Сохранить <span className='ml-auto text-xs text-muted-foreground'>⌘S</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Опубликовать <span className='ml-auto text-xs text-muted-foreground'>⌘P</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};
