import { createDebt, getAllDebts } from "./debt.service";

export const debtResolvers = {
    Query: {
        debts: () => getAllDebts(),
    },
    Mutation: {
        createDebt: (_: any, args: { amount: number; description: string; created_at: string; paid_at: string; user_id: number }) => createDebt(args.amount, args.description, args.created_at, args.paid_at, args.user_id)
    },
};