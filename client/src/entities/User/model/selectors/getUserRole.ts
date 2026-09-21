import type { UserSchema } from '../types/user';

export const getUserRole = (state: { user: UserSchema }) => state.user.authData?.role;
