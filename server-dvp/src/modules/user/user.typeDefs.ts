
export const userTypeDefs = `#graphql
    type User {
        id_user: Int
        email: String
        password: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
        createUser(email: String!, password: String!): User
    }
`;