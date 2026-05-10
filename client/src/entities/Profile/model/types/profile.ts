export interface Profile {
    id?: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    createdAt?: string;
}

export interface ProfileSchema {
    data?: Profile;
    isLoading?: boolean;
    error?: string;
}
