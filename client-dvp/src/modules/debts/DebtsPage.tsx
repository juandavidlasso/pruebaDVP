import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DebtRegister from './components/DebtRegister';
import ListDebts from './components/ListDebts';
import type { IDebt } from '../../shared/types/debt';
import DebtModal from './components/DebtModal';

const DebtsPage = () => {
    const [open, setOpen] = useState(false);
    const [selectedDebt, setSelectedDebt] = useState<IDebt | null>(null);
    const handleCreate = () => {
        setSelectedDebt(null);
        setOpen(true);
    };
    const handleEdit = (debt: IDebt) => {
        setSelectedDebt(debt);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedDebt(null);
    };

    return (
        <>
            {open && (
                <DebtModal onClose={handleClose}>
                    <DebtRegister debt={selectedDebt} onClose={handleClose} />
                </DebtModal>
            )}
            <Box className="w-full p-6">
                <Box>
                    <Typography
                        sx={{
                            fontSize: 40,
                            fontWeight: 700,
                        }}
                        className="text-center text-white"
                    >
                        Listado de deudas
                    </Typography>
                </Box>

                <ListDebts onCreate={handleCreate} onEdit={handleEdit} />
            </Box>
        </>
    );
};

export default DebtsPage;
