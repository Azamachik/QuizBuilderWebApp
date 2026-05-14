import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
    it('renders children', () => {
        render(<Card>Card content</Card>);
        expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders a div element', () => {
        render(<Card data-testid='card'>Content</Card>);
        expect(screen.getByTestId('card').tagName).toBe('DIV');
    });

    it('sets data-slot="card"', () => {
        render(<Card data-testid='card'>Content</Card>);
        expect(screen.getByTestId('card')).toHaveAttribute('data-slot', 'card');
    });

    it('applies base classes', () => {
        render(<Card data-testid='card'>Content</Card>);
        expect(screen.getByTestId('card')).toHaveClass('rounded-xl', 'border', 'bg-card');
    });

    it('merges custom className with base classes', () => {
        render(
            <Card className='p-8 shadow-lg' data-testid='card'>
                Content
            </Card>
        );
        const card = screen.getByTestId('card');
        expect(card).toHaveClass('p-8', 'shadow-lg');
        expect(card).toHaveClass('rounded-xl');
    });

    it('passes through other HTML attributes', () => {
        render(
            <Card aria-label='Quiz card' data-testid='card'>
                Content
            </Card>
        );
        expect(screen.getByTestId('card')).toHaveAttribute('aria-label', 'Quiz card');
    });
});
