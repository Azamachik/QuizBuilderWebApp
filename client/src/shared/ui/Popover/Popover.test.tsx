import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

function renderPopover() {
    return render(
        <Popover>
            <PopoverTrigger asChild>
                <button>Открыть</button>
            </PopoverTrigger>
            <PopoverContent>
                <p>Содержимое</p>
            </PopoverContent>
        </Popover>
    );
}

describe('Popover', () => {
    describe('rendering', () => {
        it('renders the trigger', () => {
            renderPopover();
            expect(screen.getByRole('button', { name: 'Открыть' })).toBeInTheDocument();
        });

        it('does not show content by default', () => {
            renderPopover();
            expect(screen.queryByText('Содержимое')).toBeNull();
        });
    });

    describe('interaction', () => {
        it('shows content when trigger is clicked', async () => {
            renderPopover();
            await userEvent.click(screen.getByRole('button', { name: 'Открыть' }));
            expect(screen.getByText('Содержимое')).toBeInTheDocument();
        });

        it('hides content when trigger is clicked again', async () => {
            renderPopover();
            const trigger = screen.getByRole('button', { name: 'Открыть' });
            await userEvent.click(trigger);
            await userEvent.click(trigger);
            expect(screen.queryByText('Содержимое')).toBeNull();
        });

        it('hides content when Escape is pressed', async () => {
            renderPopover();
            await userEvent.click(screen.getByRole('button', { name: 'Открыть' }));
            expect(screen.getByText('Содержимое')).toBeInTheDocument();
            await userEvent.keyboard('{Escape}');
            expect(screen.queryByText('Содержимое')).toBeNull();
        });
    });

    describe('data-slot attributes', () => {
        it('trigger has data-slot="popover-trigger"', () => {
            renderPopover();
            expect(screen.getByRole('button', { name: 'Открыть' })).toHaveAttribute('data-slot', 'popover-trigger');
        });

        it('content has data-slot="popover-content" when open', async () => {
            renderPopover();
            await userEvent.click(screen.getByRole('button', { name: 'Открыть' }));
            const content = screen.getByText('Содержимое').closest('[data-slot="popover-content"]');
            expect(content).toBeInTheDocument();
        });
    });

    describe('className passthrough', () => {
        it('merges custom className on content', async () => {
            render(
                <Popover>
                    <PopoverTrigger asChild>
                        <button>Открыть</button>
                    </PopoverTrigger>
                    <PopoverContent className='my-popover'>
                        <p>Текст</p>
                    </PopoverContent>
                </Popover>
            );
            await userEvent.click(screen.getByRole('button', { name: 'Открыть' }));
            const content = screen.getByText('Текст').closest('[data-slot="popover-content"]');
            expect(content).toHaveClass('my-popover');
        });
    });
});
