export type { User, UserSchema, UserRole } from './model/types/user';
export { userReducer, setAuthData, initUser, logout } from './model/slice/userSlice';
export { getUserData } from './model/selectors/getUserData';
export { getUserIsInited } from './model/selectors/getUserIsInited';
export { getUserRole } from './model/selectors/getUserRole';
