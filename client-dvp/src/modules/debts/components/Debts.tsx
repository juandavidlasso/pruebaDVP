import React, { useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import type {
    DebtData,
    DebtFilter,
    IDebt,
    IFilters,
} from '../../../shared/types/debt';
import Debt from './Debt';

interface Props {
    data: DebtData | undefined;
    onEdit: (debt: IDebt) => void;
    handleDelete: (id_debt: number) => Promise<void>;
    handlePay: (debt: IDebt) => Promise<void>;
}

const filters: IFilters[] = [
    { name: 'Todas', value: 'ALL' },
    { name: 'Pendientes', value: 'PENDING' },
    { name: 'Pagadas', value: 'PAID' },
];

const Debts: React.FC<Props> = ({ data, onEdit, handleDelete, handlePay }) => {
    const [filter, setFilter] = useState<DebtFilter>('ALL');
    const filteredDebts =
        data?.debtsByUser?.length === 0
            ? []
            : data?.debtsByUser?.filter((debt) => {
                  if (filter === 'PAID') return debt.paid_at !== null;
                  if (filter === 'PENDING') return debt.paid_at === null;
                  return true;
              });
    return (
        <>
            <Box
                sx={{ background: '#FFF', m: '0' }}
                className="max-lg:w-full! rounded-t-lg py-1 w-fit px-4"
            >
                <Box>
                    <Typography className="text-lg! font-bold!">
                        Filtros
                    </Typography>
                    <Box className="my-2 flex gap-3">
                        {filters?.map((btn) => (
                            <Button
                                onClick={() => setFilter(btn?.value)}
                                key={btn?.value}
                                className={` hover:bg-[#7D2D6F]! text-sm! normal-case! text-white! max-lg:flex-1! ${
                                    btn?.value === filter
                                        ? 'bg-[#7D2D6F]!'
                                        : 'bg-black!'
                                }`}
                            >
                                {btn?.name}
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Box>
            <TableContainer
                component={Paper}
                className="mx-auto max-lg:max-w-full rounded-t-none!"
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
                        {filteredDebts?.map((debt) => (
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
        </>
    );
};

export default Debts;
