import { Navigate, Route, Routes } from "react-router-dom"
import { AuthLayout } from "./shared/layouts/AuthLayout"
import { ROUTES } from "./shared/constants/routes"
import { ProtectedRoute } from "./shared/layouts/ProtectedRoute"
import { MainLayout } from "./shared/layouts/MainLayout"
import LoginPage from "./modules/login/Login"
import RegisterPage from "./modules/register/Register"
import DebtsPage from "./modules/debts/Debt"

export const Router = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            </Route>

            <Route
                element={
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
                }
            >
                <Route path={ROUTES.DEBTS} element={<DebtsPage />} />
            </Route>

            <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOGIN} />} />
            <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
        </Routes>
    )
}