import { useQuery } from '@apollo/client/react';
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
import { toast } from 'react-toastify';
import { DEBTS_USER } from '../../../auth/graphql/resolvers/debt/debt.query';
import type { DebtData } from '../../../shared/types/debt';
import { formatDecimal } from '../../../shared/utils/lib';
import Loader from '../../../shared/components/Loader';

const ListDebts = () => {
    const { data, loading, error } = useQuery<DebtData>(DEBTS_USER);

    if (loading) return <Loader />;

    if (error) toast.error(error.message);

    return (
        <Box className="w-full p-5 mt-5 max-lg:px-2">
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
                                        {debt?.paid_at}
                                    </TableCell>
                                    <TableCell align="center">
                                        {debt?.created_at}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="flex! gap-3! justify-center max-lg:flex-col"
                                    >
                                        <Button className="bg-yellow-700! hover:bg-yellow-600! normal-case! text-lg! py-1 text-white! max-lg:text-sm!">
                                            Editar
                                        </Button>
                                        <Button className="bg-red-900! hover:bg-red-800! normal-case! text-lg! py-1! text-white! max-lg:text-sm!">
                                            Eliminar
                                        </Button>
                                        <Button className="bg-blue-900! hover:bg-blue-800! normal-case! text-lg! py-1! text-white! max-lg:text-sm!">
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
