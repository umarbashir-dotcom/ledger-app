import { useState, useEffect, createContext, useReducer } from "react"
import authServices from "../services/authServices.js"
import AuthReducer from "../reducers/AuthReducer"

const initialState = {
    user: null,  // user's data if user is logged in - or  nul if user is logged out
    isAuthenticated: false,
    token:  localStorage.getItem("token"),
    error: null,
    success: true,
    loading: true,
}

const AuthContext = createContext(initialState)

const AuthProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(AuthReducer, initialState)
    
    useEffect(()=> {
        // get user
        getMe()
    },[])

    // login
    const login = async (loginData) => {
        try{
            const data = await authServices.login(loginData)
            dispatch({
                type: "LOGIN_USER",
                payload: data
            })
    
            return data
        } catch (err){
            throw err
        }
    }

    // logout
    const logout = () => {
        const data = authServices.logout()

        dispatch({
            type: "LOGOUT_USER",
            payload: data
        })

        return data
    }

    const register = async (registerData) => {
        const data = await authServices.register(registerData)

        dispatch({
            type: "REGISTER_USER",
            payload: data
        })

        return data
    }

    const getMe = async () => {
        try{
            const data = await authServices.getMe()
            dispatch({
                type: "SET_ME",
                payload: data
            })  
        }
        catch(err) {
            dispatch({
            type: "LOGOUT_USER",
            payload: authServices.logout()
            })
        }
    }
    
    return (<AuthContext.Provider value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        loading: state.loading,
        login,
        register,
        logout,
        getMe
    }}>
        {children}
    </AuthContext.Provider>)

}

export { AuthContext, AuthProvider}