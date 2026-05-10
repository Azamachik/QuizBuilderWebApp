import { combineReducers, type Reducer, type ReducersMapObject, type UnknownAction } from '@reduxjs/toolkit';
import type { MountedReducers, ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';

export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
    const reducers: ReducersMapObject<StateSchema> = { ...initialReducers };
    let combinedReducer: Reducer<StateSchema> = combineReducers(reducers) as unknown as Reducer<StateSchema>;
    let keysToRemove: StateSchemaKey[] = [];
    const mountedReducers: MountedReducers = {};

    return {
        getReducerMap: () => reducers,

        reduce: (state: StateSchema | undefined, action: UnknownAction): StateSchema => {
            if (keysToRemove.length > 0 && state) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state![key];
                });
                keysToRemove = [];
            }
            return combinedReducer(state, action);
        },

        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) return;
            Object.assign(reducers, { [key]: reducer });
            mountedReducers[key] = true;
            combinedReducer = combineReducers(reducers) as unknown as Reducer<StateSchema>;
        },

        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) return;
            delete reducers[key];
            keysToRemove.push(key);
            mountedReducers[key] = false;
            combinedReducer = combineReducers(reducers) as unknown as Reducer<StateSchema>;
        },
    };
}
