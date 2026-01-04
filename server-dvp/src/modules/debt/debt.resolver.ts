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

export const debtResolvers = {
    Query: {
        debtsByUser: async (_: any, __: any, context: any) => {
            if (!context.user) {
                throw unauthorized();
            }
            const userId = context.user.id_user;
            const cacheKey = `debts:user:${userId}`;

            const cached = await redisClient.get(cacheKey);

            if (cached) {
                return JSON.parse(cached);
            }

            const debts = await getDebtsByUser(context.user.id_user);

            await redisClient.set(cacheKey, JSON.stringify(debts));

            return debts;
        },
        exportDebts: async (_: any, __: any, context: any) => {
            if (!context.user) {
                throw unauthorized();
            }
            return exportDebtsService(context.user.id_user);
        },
        debtById: async (_: any, args: { id_debt: number }, context: any) => {
            if (!context.user) {
                throw unauthorized();
            }
            return getDebtById(args?.id_debt);
        },
    },
    Mutation: {
        createDebt: async (
            _: any,
            args: { amount: number; description: string },
            context: any
        ) => {
            if (!context.user) {
                throw unauthorized();
            }
            const debt = await createDebtService(
                args.amount,
                args.description,
                context.user.id_user
            );
            await redisClient.del(`debts:user:${context.user.id_user}`);
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
            if (!context.user) {
                throw unauthorized();
            }

            const { debt } = args;

            const updated = await updateDebtService({
                id_debt: debt?.id_debt,
                amount: debt?.amount,
                description: debt?.description,
                user_id: context.user.id_user,
                ...(debt?.paid_at ? { paid_at: new Date() } : {}),
            });

            await redisClient.del(`debts:user:${context.user.id_user}`);

            return updated;
        },
        deleteDebt: async (_: any, args: { id_debt: number }, context: any) => {
            if (!context.user) {
                throw unauthorized();
            }

            const debt = await deleteDebtService(args.id_debt);

            await redisClient.del(`debts:user:${context.user.id_user}`);

            return debt;
        },
    },
};
