import type { UserSchema } from '../types/user';

export const getUserIsInited = (state: { user: UserSchema }) => state.user._inited;
