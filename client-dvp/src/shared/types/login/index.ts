

export interface FormDataLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  login: {
    token: string;
  }
  user: {
    id_user: string;
    email: string;
  };
}