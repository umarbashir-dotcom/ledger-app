import { useState, useEffect, createContext, useReducer } from "react"
import authServices from "../services/authServices.js"
import AuthReducer from "../reducers/AuthReducer"

const initialState = {
    user: null,  // user's data if user is logged in - or  nul if user is logged out
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: "",
    error: null,
    success: true,
    loading: true,
}

const AuthContext = createContext(initialState)

const AuthProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(AuthReducer, initialState)

    // login
    const login = async (loginData) => {
        try{
            const data = await authServices.login(loginData)
            console.log(data)
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
    const logout = async () => {
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
    // add transaction
    // const setIsAuthenticatedAndToken = async (isAuthenticated, token) => {
    //     const data = await authServices.setIsAuthenticatedAndToken(isAuthenticated, token)

    //     dispatch({
    //         type: "SET_AUTHENTICATION_AND_TOKEN",
    //         payload: 
    //     })
    // }

    return (<AuthContext.Provider value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        loading: state.loading,
        login,
        register,
        logout
    }}>
        {children}
    </AuthContext.Provider>)

}

export { AuthContext, AuthProvider}