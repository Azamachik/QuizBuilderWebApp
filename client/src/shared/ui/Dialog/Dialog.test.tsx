import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './Dialog';

describe('Dialog', () => {
    describe('open/closed state', () => {
        it('does not render content when closed', () => {
            render(
                <Dialog open={false}>
                    <DialogContent>
                        <DialogTitle>Заголовок</DialogTitle>
                    </DialogContent>
                </Dialog>
            );
            expect(screen.queryByText('Заголовок')).toBeNull();
        });

        it('renders content when open', () => {
            render(
                <Dialog open>
                    <DialogContent>
                        <DialogTitle>Заголовок</DialogTitle>
                    </DialogContent>
                </Dialog>
            );
            expect(screen.getByText('Заголовок')).toBeInTheDocument();
        });
    });

    describe('close button', () => {
        it('calls onOpenChange(false) when the close button is clicked', async () => {
            const onOpenChange = vi.fn();
            render(
                <Dialog open onOpenChange={onOpenChange}>
                    <DialogContent>
                        <DialogTitle>Диалог</DialogTitle>
                    </DialogContent>
                </Dialog>
            );
            await userEvent.click(screen.getByRole('button'));
            expect(onOpenChange).toHaveBeenCalledWith(false);
        });
    });

    describe('DialogHeader', () => {
        it('renders children inside header', () => {
            render(
                <Dialog open>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Мой заголовок</DialogTitle>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            );
            expect(screen.getByText('Мой заголовок')).toBeInTheDocument();
        });

        it('merges custom className on header', () => {
            render(
                <Dialog open>
                    <DialogContent>
                        <DialogHeader className='custom-header' data-testid='header'>
                            <DialogTitle>Title</DialogTitle>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            );
            expect(screen.getByTestId('header')).toHaveClass('custom-header');
        });
    });

    describe('DialogTitle', () => {
        it('renders title text', () => {
            render(
                <Dialog open>
                    <DialogContent>
                        <DialogTitle>Название теста</DialogTitle>
                    </DialogContent>
                </Dialog>
            );
            expect(screen.getByText('Название теста')).toBeInTheDocument();
        });
    });
});
