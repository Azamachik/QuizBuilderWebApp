import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import * as React from 'react';
import { useAppSelector } from './useAppSelector';

const createWrapper =
    (store: ReturnType<typeof configureStore>) =>
    ({ children }: { children: React.ReactNode }) =>
        React.createElement(Provider, { store }, children);

describe('useAppSelector', () => {
    it('reads state from the store', () => {
        const store = configureStore({ reducer: { user: (s = { isInited: false }) => s } });
        const { result } = renderHook(() => useAppSelector((state: any) => state.user), { wrapper: createWrapper(store) });
        expect(result.current).toEqual({ isInited: false });
    });

    it('updates when store state changes', () => {
        const counterSlice = createSlice({
            name: 'counter',
            initialState: { value: 0 },
            reducers: {
                increment: (state) => {
                    state.value += 1;
                }
            }
        });
        const store = configureStore({ reducer: { counter: counterSlice.reducer } });
        const { result } = renderHook(() => useAppSelector((state: any) => state.counter.value), { wrapper: createWrapper(store) });

        expect(result.current).toBe(0);
        act(() => {
            store.dispatch(counterSlice.actions.increment());
        });
        expect(result.current).toBe(1);
    });

    it('applies selector transformation', () => {
        const store = configureStore({ reducer: { user: (s = { name: 'Alice' }) => s } });
        const { result } = renderHook(() => useAppSelector((state: any) => state.user.name.toUpperCase()), {
            wrapper: createWrapper(store)
        });
        expect(result.current).toBe('ALICE');
    });

    it('only re-renders when selected value changes', () => {
        const counterSlice = createSlice({
            name: 'counter',
            initialState: { a: 0, b: 0 },
            reducers: {
                incrementA: (state) => {
                    state.a += 1;
                },
                incrementB: (state) => {
                    state.b += 1;
                }
            }
        });
        const store = configureStore({ reducer: { counter: counterSlice.reducer } });
        let renderCount = 0;

        renderHook(
            () => {
                renderCount++;
                return useAppSelector((state: any) => state.counter.a);
            },
            { wrapper: createWrapper(store) }
        );

        const countAfterMount = renderCount;
        act(() => {
            store.dispatch(counterSlice.actions.incrementB());
        });
        expect(renderCount).toBe(countAfterMount); // selector result unchanged — no re-render

        act(() => {
            store.dispatch(counterSlice.actions.incrementA());
        });
        expect(renderCount).toBeGreaterThan(countAfterMount);
    });
});
