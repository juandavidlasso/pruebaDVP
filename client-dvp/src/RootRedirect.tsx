import { Navigate } from 'react-router-dom';
import { useAuth } from './auth/hooks/auth/useAuth';
import { ROUTES } from './shared/constants/routes';

export const RootRedirect = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    return (
        <Navigate to={isAuthenticated ? ROUTES.DEBTS : ROUTES.LOGIN} replace />
    );
};
