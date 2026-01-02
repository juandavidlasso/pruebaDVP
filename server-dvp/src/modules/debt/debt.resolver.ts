import { unauthorized } from "../../shared/errors/graphql-errors";
import { createDebt, getADebtsByUser } from "./debt.service";

export const debtResolvers = {
    Query: {
        debtsByUser: async (_:any, __:any, context:any) => {
            if (!context.user) {
                throw unauthorized()
            }
            return getADebtsByUser(context.user.id_user)
        },
    },
    Mutation: {
        createDebt: (_: any, args: { amount: number; description: string; created_at: string; paid_at: string; user_id: number }) => createDebt(args.amount, args.description, args.created_at, args.paid_at, args.user_id)
    },
};