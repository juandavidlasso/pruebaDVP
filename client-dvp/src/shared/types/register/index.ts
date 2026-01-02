export interface FormDataRegister {
    email: string;
    password: string;
}

export interface RegisterResponse {
    createUser: {
        id_user: string;
        email: string;
    };
}
