import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
    describe('rendering', () => {
        it('renders a button element by default', () => {
            render(<Button>Click me</Button>);
            expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
        });

        it('renders children correctly', () => {
            render(<Button>Save</Button>);
            expect(screen.getByText('Save')).toBeInTheDocument();
        });

        it('applies custom className', () => {
            render(<Button className='my-custom-class'>Btn</Button>);
            expect(screen.getByRole('button')).toHaveClass('my-custom-class');
        });

        it('sets data-slot="button"', () => {
            render(<Button>Btn</Button>);
            expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button');
        });
    });

    describe('variants via data-variant attribute', () => {
        const variants = ['default', 'action', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const;

        variants.forEach((variant) => {
            it(`sets data-variant="${variant}"`, () => {
                render(<Button variant={variant}>Btn</Button>);
                expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant);
            });
        });
    });

    describe('sizes via data-size attribute', () => {
        const sizes = ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const;

        sizes.forEach((size) => {
            it(`sets data-size="${size}"`, () => {
                render(<Button size={size}>Btn</Button>);
                expect(screen.getByRole('button')).toHaveAttribute('data-size', size);
            });
        });
    });

    describe('asChild', () => {
        it('renders child element instead of button when asChild=true', () => {
            render(
                <Button asChild>
                    <a href='/home'>Link</a>
                </Button>
            );
            const link = screen.getByRole('link', { name: 'Link' });
            expect(link).toBeInTheDocument();
            expect(link.tagName).toBe('A');
        });

        it('does not render a button element when asChild=true', () => {
            render(
                <Button asChild>
                    <a href='/home'>Link</a>
                </Button>
            );
            expect(screen.queryByRole('button')).toBeNull();
        });
    });

    describe('disabled state', () => {
        it('is disabled when disabled prop is set', () => {
            render(<Button disabled>Btn</Button>);
            expect(screen.getByRole('button')).toBeDisabled();
        });

        it('does not fire onClick when disabled', async () => {
            const onClick = vi.fn();
            render(
                <Button disabled onClick={onClick}>
                    Btn
                </Button>
            );
            await userEvent.click(screen.getByRole('button'));
            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe('click handler', () => {
        it('calls onClick when clicked', async () => {
            const onClick = vi.fn();
            render(<Button onClick={onClick}>Btn</Button>);
            await userEvent.click(screen.getByRole('button'));
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('HTML attribute passthrough', () => {
        it('passes through type attribute', () => {
            render(<Button type='submit'>Submit</Button>);
            expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
        });

        it('passes through aria-label', () => {
            render(<Button aria-label='Close dialog'>X</Button>);
            expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
        });
    });
});
