import type React from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useDebt } from '../../../auth/hooks/debt/useDebt';
import { formatNumericString } from '../../../shared/utils/lib';
import type { Debt } from '../../../shared/types/debt';

interface Props {
    onClose: () => void;
    debt: Debt | null;
}

const DebtRegister: React.FC<Props> = ({ debt, onClose }) => {
    const { register, errors, loading, onSubmit, setValue } = useDebt({
        debt,
        onClose,
    });
    return (
        <form onSubmit={onSubmit}>
            <Box className="flex flex-col gap-8 px-4">
                <Box className="w-full">
                    <TextField
                        {...register('amount')}
                        label="Valor"
                        placeholder="Ingrese el valor de la deuda"
                        fullWidth
                        error={!!errors.amount}
                        helperText={errors?.amount?.message}
                        onChange={(e) => {
                            const rawValue = e.target.value;
                            const onlyNumbers = rawValue.replace(/\D/g, '');
                            const formatted = formatNumericString(onlyNumbers);
                            setValue('amount', formatted);
                        }}
                    />
                </Box>
                <Box className="w-full">
                    <TextField
                        {...register('description')}
                        label="Descripción"
                        placeholder="Ingrese la descripción de la deuda"
                        fullWidth
                        error={!!errors.description}
                        helperText={errors?.description?.message}
                    />
                </Box>
                <Box className="w-full">
                    <Button
                        disabled={loading}
                        type="submit"
                        variant="contained"
                        fullWidth
                        className="bg-black! hover:bg-[#7D2D6F]! normal-case! text-xl! py-2!"
                    >
                        {loading ? (
                            <CircularProgress />
                        ) : debt ? (
                            'Actualizar deuda'
                        ) : (
                            'Registrar deuda'
                        )}
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default DebtRegister;
