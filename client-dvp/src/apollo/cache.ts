import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
    typePolicies: {
        Debt: {
            keyFields: ['id_debt'],
        },
        Query: {
            fields: {
                debtsByUser: {
                    merge(_, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});
