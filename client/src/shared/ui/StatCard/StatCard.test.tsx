import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

describe('StatCard', () => {
    describe('rendering', () => {
        it('displays the value', () => {
            render(<StatCard value={42} label='Создано' />);
            expect(screen.getByText('42')).toBeInTheDocument();
        });

        it('displays string value', () => {
            render(<StatCard value='1 240' label='Попытки' />);
            expect(screen.getByText('1 240')).toBeInTheDocument();
        });

        it('displays the label', () => {
            render(<StatCard value={10} label='Опубликовано' />);
            expect(screen.getByText('Опубликовано')).toBeInTheDocument();
        });
    });

    describe('highlight prop', () => {
        it('does not apply action color class by default', () => {
            render(<StatCard value={5} label='Черновики' />);
            const valueEl = screen.getByText('5');
            expect(valueEl).not.toHaveClass('text-action');
        });

        it('applies text-action class when highlight=true', () => {
            render(<StatCard value={5} label='Черновики' highlight />);
            expect(screen.getByText('5')).toHaveClass('text-action');
        });
    });

    describe('progress prop', () => {
        it('does not render a progress bar when progress is not provided', () => {
            render(<StatCard value={3} label='Тесты' />);
            expect(screen.queryByRole('progressbar')).toBeNull();
        });

        it('renders a progress bar when progress is provided', () => {
            render(<StatCard value={3} label='Тесты' progress={60} />);
            expect(screen.getByRole('progressbar')).toBeInTheDocument();
        });

        it('progress bar has the correct aria-valuenow', () => {
            render(<StatCard value={3} label='Тесты' progress={75} />);
            expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
        });

        it('renders progress bar when progress=0', () => {
            render(<StatCard value={0} label='Тесты' progress={0} />);
            expect(screen.getByRole('progressbar')).toBeInTheDocument();
        });
    });
});
