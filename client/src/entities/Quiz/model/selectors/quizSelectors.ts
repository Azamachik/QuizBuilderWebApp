import type { StateSchema } from '@/app/providers/StoreProvider';

export const getQuizzes = (state: StateSchema) => state.quizzes?.quizzes ?? [];
export const getQuizzesIsLoading = (state: StateSchema) => state.quizzes?.isLoading ?? false;
export const getQuizzesError = (state: StateSchema) => state.quizzes?.error;
export const getCurrentQuiz = (state: StateSchema) => state.quizzes?.currentQuiz;
export const getCurrentQuizIsLoading = (state: StateSchema) => state.quizzes?.currentQuizIsLoading ?? false;

export const getProfileStats = (state: StateSchema) => {
    const quizzes = state.quizzes?.quizzes ?? [];
    const created = quizzes.length;
    const published = quizzes.filter((q) => q.isPublished).length;
    const drafts = created - published;
    const attempts = quizzes.reduce((sum, q) => sum + q.attemptsCount, 0);
    return { created, published, drafts, attempts };
};

export const getQuizzesCreatedDates = (state: StateSchema): string[] =>
    (state.quizzes?.quizzes ?? []).map((q) => q.createdAt);
