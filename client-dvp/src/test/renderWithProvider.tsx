import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/auth/AuthProvider';

export const renderWithProviders = (ui: React.ReactNode) => {
    const httpLink = new HttpLink({
        uri: '/graphql',
    });

    const apolloClient = new ApolloClient({
        link: ApolloLink.from([httpLink]),
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={apolloClient}>
            <AuthProvider>
                <MemoryRouter>{ui}</MemoryRouter>
            </AuthProvider>
        </ApolloProvider>
    );
};
