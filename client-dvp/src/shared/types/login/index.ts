import type { IUser } from '../user';

export interface FormDataLogin {
    email: string;
    password: string;
}

export interface LoginResponse {
    login: string;
}

export interface MeResponse {
    me: IUser;
}
