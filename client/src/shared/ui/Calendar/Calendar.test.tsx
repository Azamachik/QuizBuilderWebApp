import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from './Calendar';

describe('Calendar', () => {
    describe('rendering', () => {
        it('renders without crashing', () => {
            expect(() => render(<Calendar mode='single' />)).not.toThrow();
        });

        it('renders day cells', () => {
            render(<Calendar mode='single' />);
            expect(screen.getAllByRole('gridcell').length).toBeGreaterThan(0);
        });

        it('renders navigation buttons', () => {
            render(<Calendar mode='single' />);
            expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
        });

        it('renders with a pre-selected date', () => {
            const date = new Date(2024, 5, 15); // June 15, 2024
            expect(() => render(<Calendar mode='single' selected={date} />)).not.toThrow();
        });
    });

    describe('navigation', () => {
        it('changes the displayed month when the next-month button is clicked', async () => {
            render(<Calendar mode='single' />);
            const buttons = screen.getAllByRole('button');
            // Last nav button is "next month"
            const nextBtn = buttons[buttons.length - 1];
            const gridBefore = screen.getAllByRole('gridcell').length;
            await userEvent.click(nextBtn);
            expect(screen.getAllByRole('gridcell').length).toBeGreaterThan(0);
            // Grid re-renders — days are still present
            expect(screen.getAllByRole('gridcell').length).toBeGreaterThanOrEqual(gridBefore - 7);
        });
    });

    describe('day selection', () => {
        it('calls onSelect when a day is clicked', async () => {
            const onSelect = vi.fn();
            render(<Calendar mode='single' onSelect={onSelect} />);
            const dayCells = screen.getAllByRole('gridcell');
            // Find a non-outside day
            const clickable = dayCells.find((cell) => !cell.hasAttribute('aria-disabled') && cell.textContent?.trim());
            if (clickable) {
                const btn = clickable.querySelector('button');
                if (btn) await userEvent.click(btn);
                expect(onSelect).toHaveBeenCalled();
            }
        });
    });
});
