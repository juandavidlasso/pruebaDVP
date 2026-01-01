import { createDebt, getAllDebts } from "./debt.service";

export const debtResolvers = {
    Query: {
        debts: async () => await getAllDebts(),
    },
    Mutation: {
        createDebt: async (_: any, args: { amount: number; description: string; created_at: string; paid_at: string; user_id: number }) => await createDebt(args.amount, args.description, args.created_at, args.paid_at, args.user_id)
    },
};