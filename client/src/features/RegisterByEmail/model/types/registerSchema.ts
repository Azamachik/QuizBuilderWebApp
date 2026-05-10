export interface RegisterSchema {
    username: string;
    email: string;
    password: string;
    confirm: string;
    isLoading: boolean;
    error?: string;
}
