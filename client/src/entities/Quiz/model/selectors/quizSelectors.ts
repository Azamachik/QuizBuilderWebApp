import type { StateSchema } from '@/app/providers/StoreProvider';

export const getQuizzes = (state: StateSchema) => state.quizzes?.quizzes ?? [];
export const getQuizzesIsLoading = (state: StateSchema) => state.quizzes?.isLoading ?? false;
export const getQuizzesError = (state: StateSchema) => state.quizzes?.error;
export const getCurrentQuiz = (state: StateSchema) => state.quizzes?.currentQuiz;
export const getCurrentQuizIsLoading = (state: StateSchema) => state.quizzes?.currentQuizIsLoading ?? false;
