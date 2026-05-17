import type { Quiz } from './Quiz';

export interface QuizSchema {
    quizzes: Quiz[];
    isLoading: boolean;
    error?: string;
    currentQuiz?: Quiz;
    currentQuizIsLoading: boolean;
    currentQuizError?: string;
}
