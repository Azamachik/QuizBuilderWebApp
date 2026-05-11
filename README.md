``` Ожидаемая структура (FSD)
└── 📁src
    └── 📁app
        └── 📁providers
            └── 📁StoreProvider
                └── 📁config
                    ├── StateSchema.ts
                    ├── reducerManager.ts
                └── 📁components
                    ├── StoreProvider.ts
        └── 📁styles
        └── 📁types
            ├── global.d.ts
        ├── App.tsx
    └── 📁entities
        └── 📁User
            └── 📁api
                ├── userApi.ts
            └── 📁model
                └── 📁consts
                    ├── consts.ts
                └── 📁selectors
                └── 📁slice
                    ├── userSlice.ts
                └── 📁types
            ├── index.ts
    └── 📁features
        └── 📁AuthByEmail
            └── 📁api
            └── 📁model
                └── 📁selectors
                └── 📁slice
                    ├── loginSlice.ts
                └── 📁types
                    ├── loginSchema.tsx
            └── 📁ui
            ├── index.ts
    └── 📁pages
        └── 📁QuizzesPage
            └── 📁api
            └── 📁model
                └── 📁selectors
                └── 📁slice
                └── 📁types
            └── 📁ui
            ├── index.ts
    └── 📁shared
        └── 📁api
            ├── api.ts
            ├── rtkApi.ts
        └── 📁config
        └── 📁const
            ├── localStorage.ts
            ├── theme.ts
    └── index.tsx
```
```reducerManager.ts - для динамического подключения редьюсеров
import {
    AnyAction,
    combineReducers,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';

import {
    MountedReducers,
    ReducerManager,
    StateSchema,
    StateSchemaKey,
} from './StateSchema';

export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: Array<StateSchemaKey> = [];

    const mountedReducers: MountedReducers = {};

    return {
        getReducerMap: () => reducers,
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }
            return combinedReducer(state, action);
        },
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;

            mountedReducers[key] = true;

            combinedReducer = combineReducers(reducers);
        },
        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            mountedReducers[key] = false;
            combinedReducer = combineReducers(reducers);
        },
    };
}
```
```StateSchema - редаксовкие типы
import {
    AnyAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
    CombinedState,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ArticleDetailsSchema } from '@/entities/Article';
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { AddCommentFormSchema } from '@/features/AddCommentForm';
import { LoginSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/features/EditableProfileCard';
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { rtkApi } from '@/shared/api/rtkApi';
import { ScrollSaveSchema } from '@/widgets/Page';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    scrollSave: ScrollSaveSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    /**
     * Асинхронные редюсеры
     * необязательные, чтобы подгружать его асинхронно (Code splitting)
     */
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
}

/**
 * ключи - counter, user, loginForm
 * ключи являются названиями редюсеров
 */
export type StateSchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

// EnhancedStore - стандартный тип, который возвращается при создании store
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
```
```store.ts
import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';

import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { scrollSaveReducer } from '@/widgets/Page';

import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        // разворачиваем полученные асинхронные редюсеры извне
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
        scrollSave: scrollSaveReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArgument: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument,
                },
            }).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
```

```useDynamicModuleLoad - хук для динамического подключения редьюсера
import { Reducer } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import {
    ReduxStoreWithManager,
    StateSchema,
    StateSchemaKey,
} from '@/app/providers/StoreProvider';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

/**
 * Хук для асинхронной подгрузки редьюсеров
 * @param reducers
 * @param removeAfterUnmount
 */
export function useDynamicModuleLoader(
    reducers: ReducersList,
    removeAfterUnmount: boolean = true,
) {
    const dispatch = useDispatch();

    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        const mountedReducers = store.reducerManager.getReducerMap();
        Object.entries(reducers).forEach(([name, reducer]) => {
            if (!Object.keys(mountedReducers).includes(name)) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
```
