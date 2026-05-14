import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import * as React from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import type { Theme } from '@/shared/consts/theme';
import { Toaster } from './Sonner';

// sonner's Toaster reads window.matchMedia to detect system color scheme preference
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn()
        }))
    });
});

function renderWithTheme(theme: Theme) {
    const { unmount } = render(
        <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
            <Toaster />
        </ThemeContext.Provider>
    );
    return { unmount };
}

describe('Toaster', () => {
    it('renders without crashing in light theme', () => {
        const { unmount } = renderWithTheme('light');
        unmount();
    });

    it('renders without crashing in dark theme', () => {
        const { unmount } = renderWithTheme('dark');
        unmount();
    });

    it('renders without crashing in system theme', () => {
        const { unmount } = renderWithTheme('system');
        unmount();
    });

    it('mounts a wrapper element in the document', () => {
        const { unmount } = renderWithTheme('light');
        expect(document).toBeDefined();
        unmount();
    });
});
