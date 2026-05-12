import { type ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';
import type { ReducersMapObject } from '@reduxjs/toolkit';
import { createReduxStore } from '../config/store';
import type { StateSchema } from '../config/StateSchema';
import type { ReducersList } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader';

interface StoreProviderProps {
    children: ReactNode;
    initialState?: Partial<StateSchema>;
    asyncReducers?: ReducersList;
}

export function StoreProvider({ children, initialState, asyncReducers }: StoreProviderProps) {
    const store = useMemo(
        () => createReduxStore(initialState, asyncReducers as ReducersMapObject<StateSchema>),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
