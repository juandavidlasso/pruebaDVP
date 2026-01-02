import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../../auth/hooks/auth/useAuth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { loading, user } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

    return <>{children}</>;
};
