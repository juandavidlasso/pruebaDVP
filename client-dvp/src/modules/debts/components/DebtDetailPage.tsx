import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useQuery } from '@apollo/client/react';
import { toast } from 'react-toastify';
import { DEBT_BY_ID } from '../../../graphql/resolvers/debt/debt.query';
import Loader from '../../../shared/components/Loader';
import type { IDebtResponse } from '../../../shared/types/debt';
import {
    formatDateMinus5Hours,
    formatNumericString,
} from '../../../shared/utils/lib';

const DebtDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useQuery<IDebtResponse>(DEBT_BY_ID, {
        variables: { idDebt: Number(id) },
    });

    if (loading) return <Loader />;
    if (error) return toast.error(error?.message);

    return (
        <Box className="w-full p-6">
            <Box className="w-full p-6 my-6">
                <Typography className="text-white! text-5xl! font-bold! text-center">
                    Detalle de la deuda
                </Typography>
            </Box>
            <Card className="max-w-[80%] mx-auto max-lg:max-w-full p-4 rounded-2xl! max-lg:px-1">
                <CardContent className="flex gap-3 flex-col max-lg:px-2!">
                    <Typography className="text-2xl! font-bold!">
                        Usuario: {data?.debtById?.user?.email}
                    </Typography>
                    <Box className="flex justify-between gap-5 mt-3 max-lg:flex-col">
                        <Box className="flex-1 border border-solid border-gray-300 shadow-xl rounded-lg p-4 gap-4 flex flex-col">
                            <Typography variant="h6">
                                Descripción: {data?.debtById?.description}
                            </Typography>
                            <Typography variant="h6">
                                Valor:{' '}
                                {formatNumericString(
                                    data?.debtById?.amount?.toString() || ''
                                )}
                            </Typography>
                            <Typography variant="h6">
                                Fecha de creación:{' '}
                                {formatDateMinus5Hours(
                                    data?.debtById?.created_at || ''
                                )}
                            </Typography>
                        </Box>
                        <Box className="flex-1 border border-solid border-gray-300 shadow-xl rounded-lg p-4 gap-4 flex flex-col">
                            <Typography variant="h6">
                                Estado de la deuda:{' '}
                                <span
                                    className={`p-1 rounded-lg px-3 text-white text-lg ${
                                        data?.debtById?.paid_at
                                            ? 'bg-green-800'
                                            : 'bg-red-900'
                                    }`}
                                >
                                    {data?.debtById?.paid_at
                                        ? 'Pagada'
                                        : 'Pendiente'}
                                </span>
                            </Typography>
                            <Typography variant="h6">
                                Fecha de pago:{' '}
                                {formatDateMinus5Hours(
                                    data?.debtById?.paid_at || ''
                                )}
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="flex justify-center items-center p-5">
                        <Button
                            onClick={() => navigate('/debts')}
                            className="bg-black! hover:bg-[#7D2D6F]! px-6! py-3! text-white! rounded-2xl!"
                        >
                            Regresar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DebtDetailPage;
