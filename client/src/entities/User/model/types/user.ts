export interface User {
    id: string;
    username: string;
    email?: string;
    token: string;
    avatar?: string;
    createdAt?: string;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
