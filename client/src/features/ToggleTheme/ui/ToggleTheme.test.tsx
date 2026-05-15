import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { ToggleTheme } from './ToggleTheme';

function renderToggleTheme(setTheme = vi.fn()) {
    return render(
        <ThemeContext.Provider value={{ theme: 'light', setTheme }}>
            <ToggleTheme />
        </ThemeContext.Provider>
    );
}

describe('ToggleTheme', () => {
    it('renders the trigger button', () => {
        renderToggleTheme();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('shows all three theme options when opened', async () => {
        renderToggleTheme();
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByText('Светлая')).toBeInTheDocument();
        expect(screen.getByText('Темная')).toBeInTheDocument();
        expect(screen.getByText('Как в системе')).toBeInTheDocument();
    });

    it('calls setTheme("light") when "Светлая" is clicked', async () => {
        const setTheme = vi.fn();
        renderToggleTheme(setTheme);
        await userEvent.click(screen.getByRole('button'));
        await userEvent.click(screen.getByText('Светлая'));
        expect(setTheme).toHaveBeenCalledWith('light');
    });

    it('calls setTheme("dark") when "Темная" is clicked', async () => {
        const setTheme = vi.fn();
        renderToggleTheme(setTheme);
        await userEvent.click(screen.getByRole('button'));
        await userEvent.click(screen.getByText('Темная'));
        expect(setTheme).toHaveBeenCalledWith('dark');
    });

    it('calls setTheme("system") when "Как в системе" is clicked', async () => {
        const setTheme = vi.fn();
        renderToggleTheme(setTheme);
        await userEvent.click(screen.getByRole('button'));
        await userEvent.click(screen.getByText('Как в системе'));
        expect(setTheme).toHaveBeenCalledWith('system');
    });
});
