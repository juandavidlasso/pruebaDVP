import type React from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';
import { useDebt } from '../../../auth/hooks/debt/useDebt';
import { formatNumericString } from '../../../shared/utils/lib';

interface Props {
    handleClose: () => void;
}
const DebtRegister: React.FC<Props> = ({ handleClose }) => {
    const { register, errors, loading, onSubmit, setValue } =
        useDebt(handleClose);
    return (
        <Dialog
            onClose={handleClose}
            open={true}
            sx={{
                '& .MuiPaper-root': {
                    width: '500px',
                    borderRadius: 5,
                    px: 3,
                    py: 4,
                    gap: 2,
                },
            }}
        >
            <DialogTitle>
                <Typography
                    sx={{
                        fontSize: 30,
                        textAlign: 'center',
                    }}
                >
                    Registrar deuda
                </Typography>
            </DialogTitle>
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
                                const formatted =
                                    formatNumericString(onlyNumbers);
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
                            {loading ? <CircularProgress /> : 'Registrar deuda'}
                        </Button>
                    </Box>
                </Box>
            </form>
        </Dialog>
    );
};

export default DebtRegister;
