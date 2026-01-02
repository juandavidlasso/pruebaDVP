import { createContext } from "react";
import type { User } from "../../shared/types/user";

type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  saveToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
