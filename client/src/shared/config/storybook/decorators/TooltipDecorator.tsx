import type { Decorator } from '@storybook/react-vite';
import { TooltipProvider } from '@/shared/ui/Tooltip/Tooltip';

export const TooltipDecorator: Decorator = (Story) => (
    <TooltipProvider>
        <Story />
    </TooltipProvider>
);
