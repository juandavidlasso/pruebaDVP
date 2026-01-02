import {
    internalServerError,
    notFound,
} from '../../shared/errors/graphql-errors';
import { Debt } from './debt.model';

export interface UpdateDebtInput {
    id_debt: number;
    description?: string;
    amount?: number;
    user_id: number;
}

export const getADebtsByUser = async (id_user: number): Promise<Debt[]> => {
    try {
        return await Debt.findAll({ where: { user_id: id_user } });
    } catch (error) {
        if (error instanceof Error) throw error;
        throw internalServerError();
    }
};

export const createDebtService = async (
    amount: number,
    description: string,
    user_id: number
): Promise<Debt> => {
    try {
        const newDebt = await Debt.create({ amount, description, user_id });
        return newDebt;
    } catch (error) {
        if (error instanceof Error) throw error;
        throw internalServerError();
    }
};

export const updateDebtService = async (
    debt: UpdateDebtInput
): Promise<Debt> => {
    try {
        const { id_debt } = debt;

        const findDebt = await Debt.findByPk(id_debt);
        if (!findDebt) throw notFound('Debt not found');

        await Debt.update(debt, { where: { id_debt: debt?.id_debt } });

        return findDebt;
    } catch (error) {
        if (error instanceof Error) throw error;
        throw internalServerError();
    }
};

export const deleteDebtService = async (id_debt: number) => {
    try {
        const debt = await Debt.findByPk(id_debt);

        if (!debt) {
            throw notFound('Debt not found');
        }

        await debt.destroy();

        return true;
    } catch (error) {
        if (error instanceof Error) throw error;
        throw internalServerError();
    }
};
