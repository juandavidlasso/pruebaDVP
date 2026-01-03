import { graphql, HttpResponse } from 'msw';

export const handlers = [
    graphql.mutation('Login', ({ variables }) => {
        const { email, password } = variables as {
            email: string;
            password: string;
        };

        if (email === 'juan@test.com' && password === '123456') {
            return HttpResponse.json({
                data: {
                    login: 'fake-jwt-token',
                },
            });
        }

        return HttpResponse.json(
            {
                errors: [{ message: 'Invalid credentials' }],
            },
            { status: 200 }
        );
    }),
    graphql.mutation('CreateUser', ({ variables }) => {
        const { email, password } = variables as {
            email: string;
            password: string;
        };

        return HttpResponse.json({
            data: {
                createUser: {
                    id_user: 0,
                    email,
                    password,
                },
            },
        });
    }),
    graphql.query('DebtsByUser', () => {
        return HttpResponse.json({
            data: {
                debtsByUser: [
                    {
                        id_debt: 1,
                        amount: 50000,
                        description: 'Deuda del carro',
                        paid_at: '1767408244988',
                        created_at: '1767408244988',
                        user_id: 10,
                    },
                    {
                        id_debt: 2,
                        amount: 800000,
                        description: 'Deuda del arriendo',
                        paid_at: '1767408244988',
                        created_at: '1767408244988',
                        user_id: 20,
                    },
                ],
            },
        });
    }),
];
