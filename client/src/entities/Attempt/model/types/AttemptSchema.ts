import type { Question } from '@/entities/Question';
import type { Attempt } from './Attempt';

export interface AttemptSchema {
    currentAttempt?: Attempt;
    sessionQuestions?: Question[];
    isLoading: boolean;
    isSubmitting: boolean;
    error?: string;
}
