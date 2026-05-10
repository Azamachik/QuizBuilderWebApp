import type { UserSchema } from '../types/user';

export const getUserData = (state: { user: UserSchema }) => state.user.authData;
