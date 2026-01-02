import { Box, Typography } from '@mui/material';

const DebtsPage = () => {
    return (
        <Box className="w-full p-6">
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
    );
};

export default DebtsPage;
