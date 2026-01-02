import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <Box className="min-h-screen flex flex-col w-screen bg-red-300">
            <header>Main Layout Header</header>
            <Outlet />
        </Box>
    );
};
