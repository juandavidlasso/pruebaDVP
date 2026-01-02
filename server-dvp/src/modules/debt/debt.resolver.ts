import { unauthorized } from '../../shared/errors/graphql-errors';
import {
    createDebtService,
    deleteDebtService,
    getADebtsByUser,
    updateDebtService,
} from './debt.service';

export const debtResolvers = {
    Query: {
        debtsByUser: async (_: any, __: any, context: any) => {
            if (!context.user) {
                throw unauthorized();
            }
            return getADebtsByUser(context.user.id_user);
        },
    },
    Mutation: {
        createDebt: (
            _: any,
            args: { amount: number; description: string; user_id: number }
        ) => createDebtService(args.amount, args.description, args.user_id),
        updateDebt: async (
            _: any,
            args: {
                debt: {
                    id_debt: number;
                    amount: number;
                    description: string;
                    user_id: number;
                };
            },
            context: any
        ) => {
            if (!context.user) {
                throw unauthorized();
            }

            const { debt } = args;

            return updateDebtService({
                id_debt: debt?.id_debt,
                amount: debt?.amount,
                description: debt?.description,
                user_id: debt?.user_id,
            });
        },

        deleteDebt: async (_: any, args: { id_debt: number }, context: any) => {
            if (!context.user) {
                throw unauthorized();
            }

            return deleteDebtService(args.id_debt);
        },
    },
};
