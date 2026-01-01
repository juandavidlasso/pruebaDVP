import { Debt } from "./debt.model";

export const getAllDebts = async (): Promise<Debt[]> => {
    try {
        return await Debt.findAll();
    } catch (error) {
        throw new Error("Failed to retrieve debts");
    }
};

export const createDebt = async (amount: number, description: string, created_at: string, paid_at: string, user_id: number): Promise<Debt> => {
    try {
        const newDebt = await Debt.create({ amount, description, created_at, paid_at, user_id });
        return newDebt;
    } catch (error) {
        throw new Error("Failed to create debt");
    }
};