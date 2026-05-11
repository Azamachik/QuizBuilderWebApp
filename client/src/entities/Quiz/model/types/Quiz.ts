export interface Quiz {
    id: string;
    title: string;
    description?: string;
    authorId: string;
    isPublished: boolean;
    createdAt: string;
    attemptsCount: number;
    questionsCount: number;
}
