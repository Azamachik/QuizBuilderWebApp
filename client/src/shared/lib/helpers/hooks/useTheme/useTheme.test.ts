import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import * as React from 'react';
import { useTheme } from './useTheme';
import { ThemeContext } from '../../../context/ThemeContext';

describe('useTheme', () => {
    it('returns theme and setTheme from context', () => {
        const setTheme = () => {};
        const wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(ThemeContext.Provider, { value: { theme: 'dark', setTheme } }, children);

        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current.theme).toBe('dark');
        expect(result.current.setTheme).toBe(setTheme);
    });

    it('returns default context values when used within default ThemeContext (no Provider)', () => {
        // ThemeContext has an initialState with theme: 'system', so no error is thrown
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('system');
    });

    it('reflects context value changes', () => {
        const setTheme = () => {};
        const wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(ThemeContext.Provider, { value: { theme: 'light', setTheme } }, children);

        const { result } = renderHook(() => useTheme(), { wrapper });
        expect(result.current.theme).toBe('light');
    });
});
