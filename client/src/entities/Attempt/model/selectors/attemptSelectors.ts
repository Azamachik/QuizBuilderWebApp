import type { StateSchema } from '@/app/providers/StoreProvider';

export const getCurrentAttempt = (state: StateSchema) => state.attempt?.currentAttempt;
export const getAttemptIsLoading = (state: StateSchema) => state.attempt?.isLoading ?? false;
export const getAttemptIsSubmitting = (state: StateSchema) => state.attempt?.isSubmitting ?? false;
export const getAttemptError = (state: StateSchema) => state.attempt?.error;
export const getAttemptSessionQuestions = (state: StateSchema) => state.attempt?.sessionQuestions ?? [];
