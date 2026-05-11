import type { Question } from '@/entities/Question';
import type { Quiz } from '@/entities/Quiz';

export interface InviteLink {
    id: string;
    quizId: string;
    token: string;
    label: string;
    maxUses: number | null;
    usedCount: number;
    expiresAt: string | null;
    isActive: boolean;
    createdAt: string;
    createdBy: string;
}

export interface TakingSession {
    inviteLink: InviteLink;
    quiz: Pick<Quiz, 'id' | 'title' | 'description'>;
    questions: Question[];
}
