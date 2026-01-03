import ExcelJS from 'exceljs';
import {
    internalServerError,
    notFound,
} from '../../shared/errors/graphql-errors';
import { Debt } from './debt.model';

export interface UpdateDebtInput {
    id_debt: number;
    description?: string;
    amount?: number;
    paid_at?: Date;
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

        const updatedDebt = await Debt.findByPk(id_debt);
        if (!updatedDebt) throw notFound('Debt not found');

        return updatedDebt;
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

export const exportDebtsService = async (userId: number) => {
    const debts = await Debt.findAll({
        where: { user_id: userId },
        order: [['created_at', 'DESC']],
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Debts');

    sheet.columns = [
        { header: 'ID', key: 'id_debt', width: 10 },
        { header: 'Valor', key: 'amount', width: 15 },
        { header: 'Descripción', key: 'description', width: 30 },
        { header: 'Estado', key: 'status', width: 15 },
        { header: 'Fecha de creación', key: 'created_at', width: 25 },
        { header: 'Fecha de pago', key: 'paid_at', width: 25 },
    ];

    debts.forEach((debt) => {
        sheet.addRow({
            id_debt: debt?.id_debt,
            description: debt?.description,
            amount: debt?.amount,
            status: debt?.paid_at ? 'Pagada' : 'Pendiente',
            created_at: debt?.created_at,
            paid_at: debt?.paid_at ?? '',
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return {
        fileName: `debts-${new Date().toISOString().split('T')[0]}.xlsx`,
        base64: Buffer.from(buffer).toString('base64'),
    };
};
