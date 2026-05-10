import type { RegisterSchema } from '../types/registerSchema';

interface State { register?: RegisterSchema }

export const getRegisterUsername = (s: State) => s.register?.username ?? '';
export const getRegisterEmail = (s: State) => s.register?.email ?? '';
export const getRegisterPassword = (s: State) => s.register?.password ?? '';
export const getRegisterConfirm = (s: State) => s.register?.confirm ?? '';
export const getRegisterIsLoading = (s: State) => s.register?.isLoading ?? false;
export const getRegisterError    = (s: State) => s.register?.error;
