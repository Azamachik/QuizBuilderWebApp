import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
    describe('rendering', () => {
        it('renders a switch role element', () => {
            render(<Switch />);
            expect(screen.getByRole('switch')).toBeInTheDocument();
        });

        it('is unchecked by default', () => {
            render(<Switch />);
            expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked');
        });

        it('is not checked (aria-checked=false) by default', () => {
            render(<Switch />);
            expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
        });
    });

    describe('controlled state', () => {
        it('renders as checked when checked=true', () => {
            render(<Switch checked onCheckedChange={() => {}} />);
            expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked');
        });

        it('renders as unchecked when checked=false', () => {
            render(<Switch checked={false} onCheckedChange={() => {}} />);
            expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked');
        });
    });

    describe('interaction', () => {
        it('calls onCheckedChange with true when clicked from unchecked state', async () => {
            const onCheckedChange = vi.fn();
            render(<Switch onCheckedChange={onCheckedChange} />);
            await userEvent.click(screen.getByRole('switch'));
            expect(onCheckedChange).toHaveBeenCalledWith(true);
        });

        it('calls onCheckedChange with false when clicked from checked state', async () => {
            const onCheckedChange = vi.fn();
            render(<Switch checked onCheckedChange={onCheckedChange} />);
            await userEvent.click(screen.getByRole('switch'));
            expect(onCheckedChange).toHaveBeenCalledWith(false);
        });
    });

    describe('disabled state', () => {
        it('is disabled when the disabled prop is set', () => {
            render(<Switch disabled />);
            expect(screen.getByRole('switch')).toBeDisabled();
        });

        it('does not call onCheckedChange when disabled', async () => {
            const onCheckedChange = vi.fn();
            render(<Switch disabled onCheckedChange={onCheckedChange} />);
            await userEvent.click(screen.getByRole('switch'));
            expect(onCheckedChange).not.toHaveBeenCalled();
        });
    });

    describe('className', () => {
        it('merges custom className', () => {
            render(<Switch className='my-switch' />);
            expect(screen.getByRole('switch')).toHaveClass('my-switch');
        });
    });
});
