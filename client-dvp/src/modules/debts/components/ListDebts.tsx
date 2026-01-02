import type React from 'react';
import { useQuery } from '@apollo/client/react';
import {
    Box,
    Button,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { DEBTS_USER } from '../../../auth/graphql/resolvers/debt/debt.query';
import type { Debt, DebtData } from '../../../shared/types/debt';
import {
    formatDateMinus5Hours,
    formatDecimal,
} from '../../../shared/utils/lib';
import Loader from '../../../shared/components/Loader';
import { useDeleteDebt } from '../../../auth/hooks/debt/useDeleteDebt';

interface Props {
    onCreate: () => void;
    onEdit: (debt: Debt) => void;
}

const ListDebts: React.FC<Props> = ({ onCreate, onEdit }) => {
    const { handleDelete, handlePay } = useDeleteDebt();
    const { data, loading, error } = useQuery<DebtData>(DEBTS_USER);

    if (loading) return <Loader />;

    if (error) toast.error(error.message);

    return (
        <Box className="w-full p-5 mt-5 max-lg:px-2 pt-0">
            <Box className="w-full flex justify-end p-3 mb-7">
                <Button
                    onClick={onCreate}
                    sx={{
                        textTransform: 'none',
                        background: '#FFF',
                        px: 2,
                        fontSize: 18,
                        color: '#000',
                        '&:hover': {
                            background: '#7D2D6F',
                            color: '#FFF',
                        },
                    }}
                    className="max-lg:w-full"
                >
                    Crear Deuda
                </Button>
            </Box>
            {data?.debtsByUser?.length === 0 ? (
                <Typography className="text-white text-4xl! font-bold! max-lg:text-2xl!">
                    No hay deudas registradas
                </Typography>
            ) : (
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
                                <TableRow key={debt?.id_debt} hover>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {debt?.id_debt}
                                    </TableCell>
                                    <TableCell align="center">
                                        {formatDecimal(debt?.amount)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {debt?.description}
                                    </TableCell>
                                    <TableCell align="center">
                                        {formatDateMinus5Hours(debt?.paid_at)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {formatDateMinus5Hours(
                                            debt?.created_at
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={
                                                debt?.paid_at
                                                    ? 'Pagada'
                                                    : 'Pendiente'
                                            }
                                            color={
                                                debt?.paid_at
                                                    ? 'success'
                                                    : 'warning'
                                            }
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
                                            onClick={() =>
                                                handleDelete(debt?.id_debt)
                                            }
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
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default ListDebts;
