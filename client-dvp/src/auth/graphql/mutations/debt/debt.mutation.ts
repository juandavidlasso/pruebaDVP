import { gql } from '@apollo/client';

export const CREATE_DEBT = gql`
    mutation CreateDebt($amount: Int!, $description: String!, $userId: Int!) {
        createDebt(
            amount: $amount
            description: $description
            user_id: $userId
        ) {
            id_debt
            amount
            description
            paid_at
            created_at
            user_id
        }
    }
`;
