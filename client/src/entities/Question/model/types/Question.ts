export type QuestionType = 'single' | 'multiple' | 'text';

export interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    order: number;
    text: string;
    type: QuestionType;
    options: Option[];
    required: boolean;
    explanation?: string;
}

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
    single: 'Одиночный выбор',
    multiple: 'Множественный выбор',
    text: 'Текст'
};
