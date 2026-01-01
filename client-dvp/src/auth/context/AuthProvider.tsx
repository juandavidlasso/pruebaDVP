import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        sessionStorage.getItem("token")
    );

    const login = (token: string) => {
        sessionStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};