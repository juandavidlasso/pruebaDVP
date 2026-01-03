import type React from 'react';
import { Button, Chip, TableCell, TableRow } from '@mui/material';
import type { IDebt } from '../../../shared/types/debt';
import {
    formatDateMinus5Hours,
    formatDecimal,
} from '../../../shared/utils/lib';

interface Props {
    debt: IDebt;
    onEdit: (debt: IDebt) => void;
    handleDelete: (id_debt: number) => Promise<void>;
    handlePay: (debt: IDebt) => Promise<void>;
}

const Debt: React.FC<Props> = ({ debt, onEdit, handleDelete, handlePay }) => {
    return (
        <TableRow key={debt?.id_debt} hover>
            <TableCell component="th" scope="row" align="center">
                {debt?.id_debt}
            </TableCell>
            <TableCell align="center">{formatDecimal(debt?.amount)}</TableCell>
            <TableCell align="center">{debt?.description}</TableCell>
            <TableCell align="center">
                {formatDateMinus5Hours(debt?.paid_at)}
            </TableCell>
            <TableCell align="center">
                {formatDateMinus5Hours(debt?.created_at)}
            </TableCell>
            <TableCell align="center">
                <Chip
                    className="w-25"
                    label={debt?.paid_at ? 'Pagada' : 'Pendiente'}
                    color={debt?.paid_at ? 'success' : 'info'}
                />
            </TableCell>
            <TableCell
                align="center"
                className="flex! gap-3! justify-center max-lg:flex-col"
            >
                <Button
                    disabled={!!debt?.paid_at}
                    onClick={() => onEdit(debt)}
                    className="bg-yellow-700! hover:bg-yellow-600! normal-case! text-lg! py-1 text-white! max-lg:text-sm! disabled:bg-gray-300!"
                >
                    Editar
                </Button>
                <Button
                    disabled={!!debt?.paid_at}
                    onClick={() => handleDelete(debt?.id_debt)}
                    className="bg-red-900! hover:bg-red-800! normal-case! text-lg! py-1! text-white! max-lg:text-sm! disabled:bg-gray-300!"
                >
                    Eliminar
                </Button>
                <Button
                    disabled={!!debt?.paid_at}
                    onClick={() => handlePay(debt)}
                    className="bg-blue-900! hover:bg-blue-800! normal-case! text-lg! py-1! text-white! max-lg:text-sm! disabled:bg-gray-300!"
                >
                    Pagar deuda
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default Debt;
