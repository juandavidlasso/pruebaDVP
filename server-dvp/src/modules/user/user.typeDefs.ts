
export const userTypeDefs = `#graphql
    type AuthPayload {
        token: String!
        user: User!
    }

    type User {
        id_user: Int
        email: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
        createUser(email: String!, password: String!): User
        login(email: String!, password: String!): AuthPayload
    }
`;