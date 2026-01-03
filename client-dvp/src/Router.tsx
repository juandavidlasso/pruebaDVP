import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from './shared/layouts/AuthLayout';
import { ROUTES } from './shared/constants/routes';
import { ProtectedRoute } from './shared/layouts/ProtectedRoute';
import { MainLayout } from './shared/layouts/MainLayout';
import { RootRedirect } from './RootRedirect';

const LoginPageLazy = lazy(() => import('./modules/login/LoginPage'));
const RegisterPageLazy = lazy(() => import('./modules/register/RegisterPage'));
const DebtsPagePageLazy = lazy(() => import('./modules/debts/DebtsPage'));

export const Router = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path={ROUTES.LOGIN} element={<LoginPageLazy />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPageLazy />} />
            </Route>

            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route path={ROUTES.DEBTS} element={<DebtsPagePageLazy />} />
            </Route>

            <Route path={ROUTES.ROOT} element={<RootRedirect />} />
            <Route path="*" element={<RootRedirect />} />
        </Routes>
    );
};
