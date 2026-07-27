import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Outlet, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

const ProtectedRoutes = () => {
    const { loading, isAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate()

    if(loading) return <Spinner />

    if(!isAuthenticated) {
        navigate("/login")
        return 
    }

    return <Outlet />
}

export default ProtectedRoutes