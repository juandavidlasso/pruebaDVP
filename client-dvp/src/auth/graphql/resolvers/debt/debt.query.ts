import { gql } from '@apollo/client';

export const DEBTS_USER = gql`
    query DebtsByUser {
        debtsByUser {
            id_debt
            amount
            description
            created_at
            paid_at
            user_id
        }
    }
`;
