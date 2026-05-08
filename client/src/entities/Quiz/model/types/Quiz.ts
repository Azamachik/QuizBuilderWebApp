export interface Quiz {
    id: string;
    title: string;
    description: string;
    status: 'published' | 'draft';
    date: string;
    participants: number;
}
