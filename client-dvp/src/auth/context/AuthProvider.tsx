import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../../shared/types/user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        sessionStorage.getItem("token")
    );
    const [user, setUser] = useState<User | null>(null);

    const saveToken = (token: string) => {
        sessionStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated: !!token,
                saveToken,
                setUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};