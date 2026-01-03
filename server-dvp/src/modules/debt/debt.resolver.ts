import { unauthorized } from '../../shared/errors/graphql-errors';
import {
    createDebtService,
    deleteDebtService,
    exportDebtsService,
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
        exportDebts: async (
            _: any,
            args: { user_id: number },
            context: any
        ) => {
            return exportDebtsService(args?.user_id);
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
                    paid_at: string;
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
                ...(debt?.paid_at ? { paid_at: new Date() } : {}),
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
