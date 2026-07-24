import { Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom"

import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import MainLayout from "./layouts/MainLayout"
import { AuthProvider } from "./context/AuthContext"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/login" element={<LoginPage />}/>
    </Route>
  )
)

const App = () => {
  return <AuthProvider> 
            <RouterProvider router={router} /> 
        </AuthProvider>
}

export default App