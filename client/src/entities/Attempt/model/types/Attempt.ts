export interface AttemptAnswer {
    questionId: string;
    selectedOptionIds: string[];
    textAnswer?: string;
}

export interface Attempt {
    id: string;
    quizId: string;
    quizTitle: string;
    inviteLinkToken: string;
    answers: AttemptAnswer[];
    score: number;
    total: number;
    label: string;
    createdAt: string;
    completedAt?: string;
}

export type AttemptCreate = Omit<Attempt, 'id' | 'createdAt'>;
