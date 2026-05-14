import type { EnhancedStore, Reducer, ReducersMapObject, UnknownAction } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { UserSchema } from '@/entities/User';
import type { ProfileSchema } from '@/entities/Profile';
import type { QuizSchema } from '@/entities/Quiz';
import type { QuestionSchema } from '@/entities/Question';
import type { InviteLinkSchema } from '@/entities/InviteLink';
import type { AttemptSchema } from '@/entities/Attempt';
import type { LoginSchema } from '@/features/AuthByEmail';
import type { RegisterSchema } from '@/features/RegisterByEmail';
import type { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
    user: UserSchema;
    api: ReturnType<typeof rtkApi.reducer>;

    // Dynamic reducers
    login?: LoginSchema;
    register?: RegisterSchema;
    profile?: ProfileSchema;
    quizzes?: QuizSchema;
    questions?: QuestionSchema;
    inviteLink?: InviteLinkSchema;
    attempt?: AttemptSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = Partial<Record<StateSchemaKey, boolean>>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema | undefined, action: UnknownAction) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

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
