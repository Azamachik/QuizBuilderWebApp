import type { Question } from './Question';

export interface QuestionSchema {
    questions: Question[]; // server-synced state
    formData: Question[]; // local working copy (edited before Save)
    isLoading: boolean;
    isSaving: boolean;
    error?: string;
}
