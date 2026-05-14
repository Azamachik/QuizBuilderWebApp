import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as React from 'react';
import { useAppDispatch } from './useAppDispatch';

const createWrapper =
    (store: ReturnType<typeof configureStore>) =>
    ({ children }: { children: React.ReactNode }) =>
        React.createElement(Provider, { store }, children);

describe('useAppDispatch', () => {
    it('returns a dispatch function', () => {
        const store = configureStore({ reducer: { user: (s = {}) => s } });
        const { result } = renderHook(() => useAppDispatch(), { wrapper: createWrapper(store) });
        expect(typeof result.current).toBe('function');
    });

    it('dispatched actions update the store state', () => {
        const counterReducer = (state = { count: 0 }, action: { type: string }) => {
            if (action.type === 'inc') return { count: state.count + 1 };
            return state;
        };
        const store = configureStore({ reducer: { counter: counterReducer } });
        const { result } = renderHook(() => useAppDispatch(), { wrapper: createWrapper(store) });

        result.current({ type: 'inc' });

        expect((store.getState() as any).counter.count).toBe(1);
    });

    it('returns the same dispatch reference across re-renders', () => {
        const store = configureStore({ reducer: { user: (s = {}) => s } });
        const { result, rerender } = renderHook(() => useAppDispatch(), { wrapper: createWrapper(store) });

        const first = result.current;
        rerender();
        expect(result.current).toBe(first);
    });
});
