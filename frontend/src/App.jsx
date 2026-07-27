import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom"

import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import MainLayout from "./layouts/MainLayout"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoutes from "./routes/ProtectedRoutes"
import PublicRoutes from "./routes/PublicRoutes"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoutes />}>
        <Route index element={<HomePage />} />
      </Route>

      {/* Public Routes */}
      <Route path="/" element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      
      <Route path="/register" element={<RegisterPage />} />
    </Route>
  )
)

const App = () => {
  return <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
}

export default App