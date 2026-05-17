export interface Profile {
    id?: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    createdAt?: string;
    avgScore?: number | null;
}

export interface ProfileSchema {
    data?: Profile;
    isLoading?: boolean;
    error?: string;
}
