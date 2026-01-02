import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/AppBar';

export const MainLayout = () => {
    return (
        <Box className="min-h-screen flex flex-col w-screen bg-black">
            <NavBar />
            <Outlet />
        </Box>
    );
};
