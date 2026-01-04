import { gql } from '@apollo/client';

export const CREATE_DEBT = gql`
    mutation CreateDebt($amount: Int!, $description: String!) {
        createDebt(amount: $amount, description: $description) {
            id_debt
            amount
            description
            paid_at
            created_at
            user_id
        }
    }
`;

export const UPDATE_DEBT = gql`
    mutation UpdateDebt($debt: UpdateDebtInput) {
        updateDebt(debt: $debt) {
            id_debt
            amount
            description
            created_at
            paid_at
            user_id
        }
    }
`;

export const DELETE_DEBT = gql`
    mutation DeleteDebt($idDebt: Int) {
        deleteDebt(id_debt: $idDebt)
    }
`;
