import { type ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import type { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children: ReactNode;
    initialState?: Partial<StateSchema>;
}

export function StoreProvider({ children, initialState }: StoreProviderProps) {
    const store = useMemo(() => createReduxStore(initialState), [initialState]);
    
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
