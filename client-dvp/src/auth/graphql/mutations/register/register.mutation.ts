import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
    mutation Register($email: String!, $password: String!) {
        createUser(email: $email, password: $password) {
            id_user
            email
        }
    }
`;
