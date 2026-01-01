import { ApolloClient, HttpLink, ApolloLink } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { cache } from './cache';

const authLink = new SetContextLink((prevContext) => {
    const token = sessionStorage.getItem('token');
    return {
        headers: {
            ...prevContext.headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache
})
