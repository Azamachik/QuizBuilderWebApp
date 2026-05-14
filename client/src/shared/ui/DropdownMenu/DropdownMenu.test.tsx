import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './DropdownMenu';

function renderMenu(extraItems?: React.ReactNode) {
    return render(
        <DropdownMenu>
            <DropdownMenuTrigger>Открыть</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Действие 1</DropdownMenuItem>
                <DropdownMenuItem>Действие 2</DropdownMenuItem>
                {extraItems}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

describe('DropdownMenu', () => {
    describe('rendering', () => {
        it('renders the trigger', () => {
            renderMenu();
            expect(screen.getByText('Открыть')).toBeInTheDocument();
        });

        it('does not show menu content before opening', () => {
            renderMenu();
            expect(screen.queryByText('Действие 1')).toBeNull();
        });
    });

    describe('opening', () => {
        it('shows menu items after clicking the trigger', async () => {
            renderMenu();
            await userEvent.click(screen.getByText('Открыть'));
            expect(screen.getByText('Действие 1')).toBeInTheDocument();
            expect(screen.getByText('Действие 2')).toBeInTheDocument();
        });
    });

    describe('item interaction', () => {
        it('calls onClick when a menu item is clicked', async () => {
            const onClick = vi.fn();
            render(
                <DropdownMenu>
                    <DropdownMenuTrigger>Открыть</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={onClick}>Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
            await userEvent.click(screen.getByText('Открыть'));
            await userEvent.click(screen.getByText('Удалить'));
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it('disabled item has data-disabled attribute', async () => {
            render(
                <DropdownMenu>
                    <DropdownMenuTrigger>Открыть</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem disabled>Заблокировано</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
            await userEvent.click(screen.getByText('Открыть'));
            const item = screen.getByText('Заблокировано').closest('[data-slot="dropdown-menu-item"]');
            expect(item).toHaveAttribute('data-disabled');
        });
    });

    describe('destructive variant', () => {
        it('sets data-variant="destructive" on the item', async () => {
            render(
                <DropdownMenu>
                    <DropdownMenuTrigger>Открыть</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem variant='destructive'>Удалить тест</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
            await userEvent.click(screen.getByText('Открыть'));
            const item = screen.getByText('Удалить тест').closest('[data-slot="dropdown-menu-item"]');
            expect(item).toHaveAttribute('data-variant', 'destructive');
        });
    });

    describe('separator', () => {
        it('renders a separator element', async () => {
            renderMenu(<DropdownMenuSeparator />);
            await userEvent.click(screen.getByText('Открыть'));
            const sep = document.querySelector('[data-slot="dropdown-menu-separator"]');
            expect(sep).toBeInTheDocument();
        });
    });
});
