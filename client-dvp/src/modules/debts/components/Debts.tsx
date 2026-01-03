import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import type { DebtData, IDebt } from '../../../shared/types/debt';
import Debt from './Debt';

interface Props {
    data: DebtData | undefined;
    onEdit: (debt: IDebt) => void;
    handleDelete: (id_debt: number) => Promise<void>;
    handlePay: (debt: IDebt) => Promise<void>;
}

const Debts: React.FC<Props> = ({ data, onEdit, handleDelete, handlePay }) => {
    return (
        <TableContainer
            component={Paper}
            className="max-w-[90%] mx-auto max-lg:max-w-full"
        >
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            align="center"
                            className="font-bold! text-lg!"
                        >
                            ID
                        </TableCell>
                        <TableCell
                            align="center"
                            className="font-bold! text-lg!"
                        >
                            Valor
                        </TableCell>
                        <TableCell
                            align="center"
                            className="font-bold! text-lg!"
                        >
                            Descripción
                        </TableCell>
                        <TableCell
                            align="center"
                            className="font-bold! text-lg!"
                        >
                            Fecha de pago
                        </TableCell>
                        <TableCell
                            align="center"
                            className="font-bold! text-lg!"
                        >
                            Fecha de creación
                        </TableCell>
                        <TableCell
                            align="center"
                            className="font-bold! text-lg!"
                        >
                            Estado
                        </TableCell>
                        <TableCell
                            align="center"
                            className="font-bold! text-lg!"
                        >
                            Edición
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.debtsByUser.map((debt) => (
                        <Debt
                            key={debt?.id_debt}
                            debt={debt}
                            onEdit={onEdit}
                            handleDelete={handleDelete}
                            handlePay={handlePay}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Debts;
