import { internalServerError } from "../../shared/errors/graphql-errors";
import { Debt } from "./debt.model";

export const getADebtsByUser = async (id_user:number): Promise<Debt[]> => {
    try {
        return await Debt.findAll({ where: { user_id: id_user }});
    } catch (error) {
        throw internalServerError();
    }
};

export const createDebt = async (amount: number, description: string, user_id: number): Promise<Debt> => {
    try {
        const newDebt = await Debt.create({ amount, description, user_id });
        return newDebt;
    } catch (error) {
        throw internalServerError();
    }
};