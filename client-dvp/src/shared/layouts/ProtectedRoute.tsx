import { Navigate } from "react-router-dom"
import { ROUTES } from "../constants/routes"
import { useAuth } from "../../auth/hooks/useAuth"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated} = useAuth()

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />

  return <>{children}</>
}