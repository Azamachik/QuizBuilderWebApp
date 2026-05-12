import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from 'lucide-react';
import { Button } from '../Button/Button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

const meta = {
    title: 'Shared/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [(Story) => <TooltipProvider><Story /></TooltipProvider>],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant='outline'>Наведите</Button>
            </TooltipTrigger>
            <TooltipContent>Подсказка</TooltipContent>
        </Tooltip>
    ),
};

export const OnIcon: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger asChild>
                <button className='rounded-full p-1 text-muted-foreground hover:text-foreground'>
                    <Info className='size-5' />
                </button>
            </TooltipTrigger>
            <TooltipContent>Дополнительная информация</TooltipContent>
        </Tooltip>
    ),
};

export const Positions: Story = {
    render: () => (
        <div className='flex items-center gap-6'>
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                <Tooltip key={side}>
                    <TooltipTrigger asChild>
                        <Button variant='outline' size='sm'>{side}</Button>
                    </TooltipTrigger>
                    <TooltipContent side={side}>Позиция: {side}</TooltipContent>
                </Tooltip>
            ))}
        </div>
    ),
};
