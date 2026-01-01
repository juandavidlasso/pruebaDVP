import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                debts: {
                    merge(_, incoming) {
                        return incoming
                    },
                },
            },
        },
    },
});