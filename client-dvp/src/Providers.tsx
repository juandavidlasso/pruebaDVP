import { ApolloProvider } from '@apollo/client/react';
import { ToastContainer } from 'react-toastify';
import { apolloClient } from './apollo/client';
import { AuthProvider } from './context/auth/AuthProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ApolloProvider client={apolloClient}>
            <AuthProvider>
                <ToastContainer
                    autoClose={3000}
                    position="top-right"
                    pauseOnHover={false}
                    theme="colored"
                />
                {children}
            </AuthProvider>
        </ApolloProvider>
    );
};
