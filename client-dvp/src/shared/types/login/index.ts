import type { User } from '../user';

export interface FormDataLogin {
    email: string;
    password: string;
}

export interface LoginResponse {
    login: string;
}

export interface MeResponse {
    me: User;
}
