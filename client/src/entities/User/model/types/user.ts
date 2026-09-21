export type UserRole = 'admin' | 'user';

export interface User {
    id: string;
    username: string;
    email?: string;
    token: string;
    avatar?: string;
    createdAt?: string;
    role?: UserRole;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
