import { unauthorized } from '../../shared/errors/graphql-errors';
import {
    createDebtService,
    deleteDebtService,
    exportDebtsService,
    getDebtById,
    getDebtsByUser,
    updateDebtService,
} from './debt.service';
import { redisClient } from '../../config/redis';
import { requireAuth } from '../../shared/utils/requireAuth';

export const debtResolvers = {
    Query: {
        debtsByUser: async (_: any, __: any, context: any) => {
            const user = requireAuth(context);
            const userId = user.id_user;
            const cacheKey = `debts:user:${userId}`;

            const cached = await redisClient.get(cacheKey);

            if (cached) {
                return JSON.parse(cached);
            }

            const debts = await getDebtsByUser(user.id_user);

            await redisClient.set(cacheKey, JSON.stringify(debts));

            return debts;
        },
        exportDebts: async (_: any, __: any, context: any) => {
            const user = requireAuth(context);
            return exportDebtsService(user.id_user);
        },
        debtById: async (_: any, args: { id_debt: number }, context: any) => {
            requireAuth(context);
            return getDebtById(args?.id_debt);
        },
    },
    Mutation: {
        createDebt: async (
            _: any,
            args: { amount: number; description: string },
            context: any
        ) => {
            const user = requireAuth(context);
            const debt = await createDebtService(
                args.amount,
                args.description,
                user.id_user
            );
            await redisClient.del(`debts:user:${user.id_user}`);
            return debt;
        },
        updateDebt: async (
            _: any,
            args: {
                debt: {
                    id_debt: number;
                    amount: number;
                    description: string;
                    paid_at: string;
                };
            },
            context: any
        ) => {
            const user = requireAuth(context);

            const { debt } = args;

            const updated = await updateDebtService({
                id_debt: debt?.id_debt,
                amount: debt?.amount,
                description: debt?.description,
                user_id: user.id_user,
                ...(debt?.paid_at ? { paid_at: new Date() } : {}),
            });

            await redisClient.del(`debts:user:${user.id_user}`);

            return updated;
        },
        deleteDebt: async (_: any, args: { id_debt: number }, context: any) => {
            const user = requireAuth(context);
            const debt = await deleteDebtService(args.id_debt);

            await redisClient.del(`debts:user:${user.id_user}`);

            return debt;
        },
    },
};
