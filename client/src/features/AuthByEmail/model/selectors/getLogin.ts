import type { LoginSchema } from '../types/loginSchema';

interface State {
    login?: LoginSchema;
}

export const getLoginEmail = (s: State) => s.login?.email ?? '';
export const getLoginPassword = (s: State) => s.login?.password ?? '';
export const getLoginIsLoading = (s: State) => s.login?.isLoading ?? false;
export const getLoginError = (s: State) => s.login?.error;
