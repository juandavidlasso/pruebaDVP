
export const userTypeDefs = `#graphql
    type User {
        id_user: Int
        email: String
    }

    type Query {
        users: [User]
        me: User!
    }

    type Mutation {
        createUser(email: String!, password: String!): User
        login(email: String!, password: String!): String
    }
`;