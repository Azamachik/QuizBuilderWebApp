import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
    it('renders a div element', () => {
        const { container } = render(<Skeleton />);
        expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('has animate-pulse class', () => {
        const { container } = render(<Skeleton />);
        expect(container.firstChild).toHaveClass('animate-pulse');
    });

    it('has rounded-lg and bg-muted base classes', () => {
        const { container } = render(<Skeleton />);
        expect(container.firstChild).toHaveClass('rounded-lg', 'bg-muted');
    });

    it('merges custom className with base classes', () => {
        const { container } = render(<Skeleton className='h-10 w-full' />);
        expect(container.firstChild).toHaveClass('h-10', 'w-full');
        expect(container.firstChild).toHaveClass('animate-pulse');
    });

    it('renders nothing inside (empty div)', () => {
        const { container } = render(<Skeleton />);
        expect(container.firstChild?.childNodes.length).toBe(0);
    });
});
