import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
  return (
    <Box>
      <header>Main Layout Header</header>
      <Outlet />
    </Box>
  )
}