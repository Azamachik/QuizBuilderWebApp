import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
    describe('display text', () => {
        it('shows "Опубликован" when status is true', () => {
            render(<StatusBadge status={true} />);
            expect(screen.getByText('Опубликован')).toBeInTheDocument();
        });

        it('shows "Черновик" when status is false', () => {
            render(<StatusBadge status={false} />);
            expect(screen.getByText('Черновик')).toBeInTheDocument();
        });
    });

    describe('interactive mode (with onClick)', () => {
        it('renders a button', () => {
            render(<StatusBadge status={true} onClick={() => {}} />);
            expect(screen.getByRole('button')).toBeInTheDocument();
        });

        it('calls onClick when clicked', async () => {
            const onClick = vi.fn();
            render(<StatusBadge status={false} onClick={onClick} />);
            await userEvent.click(screen.getByRole('button'));
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('static mode (without onClick)', () => {
        it('renders a span, not a button', () => {
            render(<StatusBadge status={true} />);
            expect(screen.queryByRole('button')).toBeNull();
            expect(screen.getByText('Опубликован').tagName).toBe('SPAN');
        });
    });
});
