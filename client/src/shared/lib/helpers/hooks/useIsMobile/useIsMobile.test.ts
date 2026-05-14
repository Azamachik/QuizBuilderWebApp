import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsMobile } from './useIsMobile';

function mockMatchMedia(matches: boolean) {
    const listeners: ((e: MediaQueryListEvent) => void)[] = [];
    const mql = {
        matches,
        addEventListener: vi.fn((_: string, cb: (e: MediaQueryListEvent) => void) => {
            listeners.push(cb);
        }),
        removeEventListener: vi.fn(),
        dispatchChange: (newMatches: boolean) => {
            listeners.forEach((fn) => fn({ matches: newMatches } as MediaQueryListEvent));
        }
    };
    return mql;
}

describe('useIsMobile', () => {
    const originalMatchMedia = window.matchMedia;

    afterEach(() => {
        Object.defineProperty(window, 'matchMedia', { value: originalMatchMedia, writable: true });
    });

    describe('initial value from window.innerWidth', () => {
        it('returns true when innerWidth < 768', () => {
            Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true });
            const mql = mockMatchMedia(true);
            Object.defineProperty(window, 'matchMedia', {
                value: vi.fn().mockReturnValue(mql),
                writable: true
            });

            const { result } = renderHook(() => useIsMobile());
            expect(result.current).toBe(true);
        });

        it('returns false when innerWidth >= 768', () => {
            Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true });
            const mql = mockMatchMedia(false);
            Object.defineProperty(window, 'matchMedia', {
                value: vi.fn().mockReturnValue(mql),
                writable: true
            });

            const { result } = renderHook(() => useIsMobile());
            expect(result.current).toBe(false);
        });
    });

    describe('responds to media query changes', () => {
        it('updates to true when viewport shrinks below breakpoint', async () => {
            Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true });
            const mql = mockMatchMedia(false);
            Object.defineProperty(window, 'matchMedia', {
                value: vi.fn().mockReturnValue(mql),
                writable: true
            });

            const { result } = renderHook(() => useIsMobile());
            expect(result.current).toBe(false);

            const { act } = await import('@testing-library/react');
            act(() => mql.dispatchChange(true));
            expect(result.current).toBe(true);
        });

        it('updates to false when viewport grows above breakpoint', async () => {
            Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true });
            const mql = mockMatchMedia(true);
            Object.defineProperty(window, 'matchMedia', {
                value: vi.fn().mockReturnValue(mql),
                writable: true
            });

            const { result } = renderHook(() => useIsMobile());
            expect(result.current).toBe(true);

            const { act } = await import('@testing-library/react');
            act(() => mql.dispatchChange(false));
            expect(result.current).toBe(false);
        });
    });

    describe('cleanup', () => {
        it('removes the event listener on unmount', () => {
            const mql = mockMatchMedia(false);
            Object.defineProperty(window, 'matchMedia', {
                value: vi.fn().mockReturnValue(mql),
                writable: true
            });

            const { unmount } = renderHook(() => useIsMobile());
            unmount();
            expect(mql.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
        });
    });

    describe('matchMedia query string', () => {
        it('uses the correct breakpoint in the query', () => {
            const mql = mockMatchMedia(false);
            const matchMediaMock = vi.fn().mockReturnValue(mql);
            Object.defineProperty(window, 'matchMedia', { value: matchMediaMock, writable: true });

            renderHook(() => useIsMobile());
            expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 767px)');
        });
    });
});
