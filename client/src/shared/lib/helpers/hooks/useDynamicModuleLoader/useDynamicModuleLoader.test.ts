import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as React from 'react';
import { useDynamicModuleLoader } from './useDynamicModuleLoader';
import type { ReducersList } from './useDynamicModuleLoader';

function createStoreWithManager(existingKeys: string[] = []) {
    const reducerMap: Record<string, any> = {};
    existingKeys.forEach((key) => {
        reducerMap[key] = (s = {}) => s;
    });

    const reducerManager = {
        getReducerMap: vi.fn(() => ({ ...reducerMap })),
        add: vi.fn((key: string, reducer: any) => {
            reducerMap[key] = reducer;
        }),
        remove: vi.fn((key: string) => {
            delete reducerMap[key];
        })
    };

    const dispatchedActions: { type: string }[] = [];
    const trackingMiddleware = () => (next: any) => (action: any) => {
        dispatchedActions.push(action);
        return next(action);
    };

    const baseStore = configureStore({
        reducer: { user: (s = {}) => s },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(trackingMiddleware)
    });

    const store = Object.assign(baseStore, { reducerManager }) as any;

    return { store, reducerManager, dispatchedActions };
}

const createWrapper =
    (store: any) =>
    ({ children }: { children: React.ReactNode }) =>
        React.createElement(Provider, { store }, children);

const stubReducer = (s = {}) => s;

describe('useDynamicModuleLoader', () => {
    describe('mounting — adds reducers', () => {
        it('adds the reducer to the store on mount', () => {
            const { store, reducerManager } = createStoreWithManager();
            renderHook(() => useDynamicModuleLoader({ login: stubReducer } as ReducersList), { wrapper: createWrapper(store) });
            expect(reducerManager.add).toHaveBeenCalledWith('login', stubReducer);
        });

        it('dispatches @INIT action for each added reducer', () => {
            const { store, dispatchedActions } = createStoreWithManager();
            renderHook(() => useDynamicModuleLoader({ login: stubReducer } as ReducersList), { wrapper: createWrapper(store) });
            expect(dispatchedActions).toContainEqual({ type: '@INIT login reducer' });
        });

        it('adds multiple reducers in one call', () => {
            const { store, reducerManager } = createStoreWithManager();
            renderHook(() => useDynamicModuleLoader({ login: stubReducer, profile: stubReducer } as ReducersList), {
                wrapper: createWrapper(store)
            });
            expect(reducerManager.add).toHaveBeenCalledWith('login', stubReducer);
            expect(reducerManager.add).toHaveBeenCalledWith('profile', stubReducer);
        });

        it('does not add a reducer that is already mounted', () => {
            const { store, reducerManager } = createStoreWithManager(['login']);
            renderHook(() => useDynamicModuleLoader({ login: stubReducer } as ReducersList), { wrapper: createWrapper(store) });
            expect(reducerManager.add).not.toHaveBeenCalled();
        });

        it('adds only the reducers not yet mounted', () => {
            const { store, reducerManager } = createStoreWithManager(['login']);
            renderHook(() => useDynamicModuleLoader({ login: stubReducer, profile: stubReducer } as ReducersList), {
                wrapper: createWrapper(store)
            });
            expect(reducerManager.add).toHaveBeenCalledTimes(1);
            expect(reducerManager.add).toHaveBeenCalledWith('profile', stubReducer);
        });
    });

    describe('unmounting with removeAfterUnmount=true (default)', () => {
        it('removes the reducer on unmount', () => {
            const { store, reducerManager } = createStoreWithManager();
            const { unmount } = renderHook(() => useDynamicModuleLoader({ login: stubReducer } as ReducersList), {
                wrapper: createWrapper(store)
            });
            unmount();
            expect(reducerManager.remove).toHaveBeenCalledWith('login');
        });

        it('dispatches @DESTROY action on unmount', () => {
            const { store, dispatchedActions } = createStoreWithManager();
            const { unmount } = renderHook(() => useDynamicModuleLoader({ login: stubReducer } as ReducersList), {
                wrapper: createWrapper(store)
            });
            unmount();
            expect(dispatchedActions).toContainEqual({ type: '@DESTROY login reducer' });
        });

        it('removes all provided reducers on unmount', () => {
            const { store, reducerManager } = createStoreWithManager();
            const { unmount } = renderHook(() => useDynamicModuleLoader({ login: stubReducer, profile: stubReducer } as ReducersList), {
                wrapper: createWrapper(store)
            });
            unmount();
            expect(reducerManager.remove).toHaveBeenCalledWith('login');
            expect(reducerManager.remove).toHaveBeenCalledWith('profile');
        });
    });

    describe('unmounting with removeAfterUnmount=false', () => {
        it('does not remove reducers on unmount', () => {
            const { store, reducerManager } = createStoreWithManager();
            const { unmount } = renderHook(() => useDynamicModuleLoader({ login: stubReducer } as ReducersList, false), {
                wrapper: createWrapper(store)
            });
            unmount();
            expect(reducerManager.remove).not.toHaveBeenCalled();
        });

        it('does not dispatch @DESTROY on unmount', () => {
            const { store, dispatchedActions } = createStoreWithManager();
            const { unmount } = renderHook(() => useDynamicModuleLoader({ login: stubReducer } as ReducersList, false), {
                wrapper: createWrapper(store)
            });
            unmount();
            expect(dispatchedActions.some((a) => a.type.startsWith('@DESTROY'))).toBe(false);
        });
    });
});
