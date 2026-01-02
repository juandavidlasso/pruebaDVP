import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { AuthContext } from './AuthContext';
import type { User } from '../../shared/types/user';
import { ME_QUERY } from '../graphql/resolvers/login/login.query';
import type { MeResponse } from '../../shared/types/login';
import { apolloClient } from '../../apollo/client';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() =>
        sessionStorage.getItem('token')
    );

    const { data, loading } = useQuery<MeResponse>(ME_QUERY, {
        skip: !token,
    });

    const authLoading = loading || (!!token && !user);

    useEffect(() => {
        if (data?.me) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(data.me);
        }
    }, [data]);

    const saveToken = (token: string) => {
        sessionStorage.setItem('token', token);
        setToken(token);
    };

    const logout = async () => {
        sessionStorage.removeItem('token');
        setUser(null);
        setToken(null);

        await apolloClient.clearStore();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading: authLoading,
                saveToken,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
