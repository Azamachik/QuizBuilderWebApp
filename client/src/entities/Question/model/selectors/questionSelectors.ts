import type { StateSchema } from '@/app/providers/StoreProvider';

export const getQuestions = (state: StateSchema) => state.questions?.formData ?? [];
export const getQuestionsIsLoading = (state: StateSchema) => state.questions?.isLoading ?? false;
export const getQuestionsIsSaving = (state: StateSchema) => state.questions?.isSaving ?? false;
export const getQuestionsError = (state: StateSchema) => state.questions?.error;
