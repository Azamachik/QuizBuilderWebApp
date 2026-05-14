import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

// Radix UI Tooltip renders a visually-hidden <span role="tooltip"> for a11y alongside the visible
// content — so querying by text finds 2 nodes. Target by data-slot instead.

function renderTooltip(open?: boolean) {
    return render(
        <TooltipProvider>
            <Tooltip open={open}>
                <TooltipTrigger asChild>
                    <button>Наведи</button>
                </TooltipTrigger>
                <TooltipContent>Подсказка</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

describe('Tooltip', () => {
    describe('rendering', () => {
        it('renders the trigger element', () => {
            renderTooltip();
            expect(screen.getByRole('button', { name: 'Наведи' })).toBeInTheDocument();
        });

        it('does not render content when closed (default)', () => {
            renderTooltip();
            expect(document.querySelector('[data-slot="tooltip-content"]')).toBeNull();
        });

        it('renders content when open=true', () => {
            renderTooltip(true);
            expect(document.querySelector('[data-slot="tooltip-content"]')).not.toBeNull();
        });

        it('content contains the tooltip text when open', () => {
            renderTooltip(true);
            const content = document.querySelector('[data-slot="tooltip-content"]');
            expect(content?.textContent).toContain('Подсказка');
        });
    });

    describe('data-slot attributes', () => {
        it('trigger has data-slot="tooltip-trigger"', () => {
            renderTooltip();
            expect(screen.getByRole('button', { name: 'Наведи' })).toHaveAttribute('data-slot', 'tooltip-trigger');
        });

        it('content has data-slot="tooltip-content" when open', () => {
            renderTooltip(true);
            expect(document.querySelector('[data-slot="tooltip-content"]')).toBeInTheDocument();
        });
    });

    describe('className passthrough on content', () => {
        it('merges custom className on tooltip content', () => {
            render(
                <TooltipProvider>
                    <Tooltip open>
                        <TooltipTrigger asChild>
                            <button>Btn</button>
                        </TooltipTrigger>
                        <TooltipContent className='my-tooltip'>Текст</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
            expect(document.querySelector('[data-slot="tooltip-content"]')).toHaveClass('my-tooltip');
        });
    });
});
