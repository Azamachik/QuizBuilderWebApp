import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
    it('renders the progress element', () => {
        render(<Progress value={50} />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('sets aria-valuenow via the value prop', () => {
        render(<Progress value={75} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
    });

    it('defaults to 0 when value is not provided', () => {
        render(<Progress />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });

    it('sets data-slot="progress"', () => {
        render(<Progress value={30} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('data-slot', 'progress');
    });

    it('applies custom className to the root', () => {
        render(<Progress value={50} className='h-2 w-1/2' />);
        expect(screen.getByRole('progressbar')).toHaveClass('h-2', 'w-1/2');
    });

    it('indicator translateX reflects the value — 0% means translateX(-100%)', () => {
        const { container } = render(<Progress value={0} />);
        const indicator = container.querySelector('[data-slot="progress-indicator"]');
        expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' });
    });

    it('indicator translateX reflects the value — 100% means translateX(0%)', () => {
        const { container } = render(<Progress value={100} />);
        const indicator = container.querySelector('[data-slot="progress-indicator"]');
        expect(indicator).toHaveStyle({ transform: 'translateX(-0%)' });
    });

    it('indicator translateX reflects the value — 50% means translateX(-50%)', () => {
        const { container } = render(<Progress value={50} />);
        const indicator = container.querySelector('[data-slot="progress-indicator"]');
        expect(indicator).toHaveStyle({ transform: 'translateX(-50%)' });
    });
});
