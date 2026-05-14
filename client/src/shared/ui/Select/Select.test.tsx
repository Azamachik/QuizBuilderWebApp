import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';

// Radix UI Select requires pointer capture APIs and real pointer events to open its dropdown.
// jsdom doesn't support this interaction path, so we test rendering and controlled state only.

function renderSelect() {
    return render(
        <Select>
            <SelectTrigger>
                <SelectValue placeholder='Выберите...' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='opt1'>Вариант 1</SelectItem>
                <SelectItem value='opt2'>Вариант 2</SelectItem>
            </SelectContent>
        </Select>
    );
}

describe('Select', () => {
    describe('rendering', () => {
        it('renders the trigger with placeholder', () => {
            renderSelect();
            expect(screen.getByText('Выберите...')).toBeInTheDocument();
        });

        it('trigger has combobox role', () => {
            renderSelect();
            expect(screen.getByRole('combobox')).toBeInTheDocument();
        });

        it('does not show options before opening', () => {
            renderSelect();
            expect(screen.queryByText('Вариант 1')).toBeNull();
        });
    });

    describe('controlled value', () => {
        it('displays the controlled value', () => {
            render(
                <Select value='opt1'>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='opt1'>Вариант 1</SelectItem>
                    </SelectContent>
                </Select>
            );
            expect(screen.getByRole('combobox')).toHaveTextContent('Вариант 1');
        });

        it('trigger is closed by default (aria-expanded=false)', () => {
            renderSelect();
            expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
        });

        it('trigger has data-state="closed" by default', () => {
            renderSelect();
            expect(screen.getByRole('combobox')).toHaveAttribute('data-state', 'closed');
        });
    });
});
