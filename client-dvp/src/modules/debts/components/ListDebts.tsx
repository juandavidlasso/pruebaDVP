import type React from 'react';
import { useQuery } from '@apollo/client/react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { DEBTS_USER } from '../../../graphql/resolvers/debt/debt.query';
import type { IDebt, DebtData } from '../../../shared/types/debt';
import Loader from '../../../shared/components/Loader';
import { useDebt } from '../../../hooks/debt/useDebt';
import Debts from './Debts';

interface Props {
    onCreate: () => void;
    onEdit: (debt: IDebt) => void;
}

const ListDebts: React.FC<Props> = ({ onCreate, onEdit }) => {
    const { loading, called, handleSubmit, handleDelete, handlePay } =
        useDebt();
    const {
        data,
        loading: loadingDebts,
        error,
    } = useQuery<DebtData>(DEBTS_USER, {
        fetchPolicy: 'cache-first',
    });

    if (loadingDebts) return <Loader />;

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
                <Debts
                    data={data}
                    onEdit={onEdit}
                    handleDelete={handleDelete}
                    handlePay={handlePay}
                />
            )}

            {data?.debtsByUser && data?.debtsByUser?.length > 0 && (
                <Box className="w-full flex justify-center items-center p-5">
                    <Button
                        onClick={handleSubmit}
                        type="button"
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
                        {called && loading ? (
                            <CircularProgress />
                        ) : (
                            'Descargar Deudas'
                        )}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ListDebts;
