import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import DebtRegister from './components/DebtRegister';
import ListDebts from './components/ListDebts';

const DebtsPage = () => {
    const [showFormDebt, setShowFormDebt] = useState<boolean>(false);

    return (
        <>
            {showFormDebt && (
                <DebtRegister handleClose={() => setShowFormDebt(false)} />
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
                <Box className="w-full flex justify-end p-3">
                    <Button
                        onClick={() => setShowFormDebt(true)}
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

                <ListDebts />
            </Box>
        </>
    );
};

export default DebtsPage;
