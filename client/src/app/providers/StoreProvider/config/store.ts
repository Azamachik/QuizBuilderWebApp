import { configureStore, type Reducer, type ReducersMapObject, type ThunkDispatch, type UnknownAction } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { createReducerManager } from './reducerManager';
import type { StateSchema, ThunkExtraArg } from './StateSchema';

export function createReduxStore(
    initialState?: Partial<StateSchema>,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers = {
        ...asyncReducers,
        user: userReducer,
        api: rtkApi.reducer,
    } as ReducersMapObject<StateSchema>;

    const reducerManager = createReducerManager(rootReducers);

    const extraArgument: ThunkExtraArg = { api: $api };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<StateSchema>,
        devTools: __IS_DEV__,
        preloadedState: initialState as unknown as StateSchema | undefined,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: { extraArgument } }).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ThunkDispatch<StateSchema, ThunkExtraArg, UnknownAction>;
