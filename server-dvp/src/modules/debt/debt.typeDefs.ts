export const debtTypeDefs = `#graphql
    type Debt {
        id_debt: Int
        amount: Int
        description: String
        created_at: String
        paid_at: String
        user_id: Int
    }
    
    input UpdateDebtInput {
        id_debt: Int
        description: String
        amount: Int
        paid_at: String
        user_id:Int
    }

    type ExportDebtsResponse {
        fileName: String!
        base64: String!
    }

    extend type Query {
        exportDebts(user_id:Int!): ExportDebtsResponse!
    }

    type Query {
        debtsByUser: [Debt]
    }

    type Mutation {
        createDebt(amount: Int!, description: String!, user_id: Int!): Debt
        updateDebt(debt: UpdateDebtInput): Debt
        deleteDebt(id_debt: Int): Boolean
    }
`;
