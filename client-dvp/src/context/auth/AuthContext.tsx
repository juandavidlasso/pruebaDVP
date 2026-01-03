import { createContext } from 'react';
import type { IUser } from '../../shared/types/user';

type AuthContextType = {
    user: IUser | null;
    isAuthenticated: boolean;
    saveToken: (token: string) => void;
    loading: boolean;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
