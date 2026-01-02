import { createContext } from 'react';
import type { User } from '../../shared/types/user';

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    saveToken: (token: string) => void;
    loading: boolean;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
