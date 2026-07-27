import { useState, useEffect, createContext, useContext, useReducer } from "react"
import appServices from "../services/appServices.js"
import AppReducer from "../reducers/AppReducer"
import { AuthContext } from "./AuthContext.jsx"

const initialState = {
    transactions: [],
    pagedTransactions: [],
    budgets: [],
    totalPages: 1,
    error: null,
    success: true,
    loading: true,
    message: ""
}

const GlobalContext = createContext(initialState)

const GlobalProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(AppReducer, initialState)

    // fetch all transactions
    const fetchAllTransactions = async () => {
        try{
            const transactions = await appServices.fetchAllTransactions()
            dispatch({
                type: "SET_TRANSACTIONS",
                payload: transactions
            })
        } catch (err) {
            dispatch({
                type: "SET_ERROR",
                payload: err.message
            })   
        }
    }
    
    // fetch paged transactions
    const fetchPagedTransactions = async (currentPage, limit) => {
        try{
            const pagedTransactions = await appServices.fetchPagedTransactions(currentPage, limit)
            dispatch({
                type: "SET_PAGEDTRANSACTIONS",
                payload: pagedTransactions
            })
        } catch (err) {
            dispatch({
                type: "SET_ERROR",
                payload: err.message
            }) 
        }
    }
    
    // add transaction
    const addTransaction = async (transaction) => {
        try{
            const newTransaction = await appServices.addTransaction(transaction)

            if (newTransaction) {
                dispatch({
                    type: "ADD_TRANSACTION",
                    payload: newTransaction
                })
            }
        } catch(err){
            dispatch({
                type: "SET_ERROR",
                payload: err.message
            }) 

            throw err
        }
    }

    // delete transaction
    const deleteTransaction = async (id) => {
        const deleted_id = await appServices.deleteTransaction(id)
        if(deleted_id){
            dispatch({
                type: "DELETE_TRANSACTION",
                payload: deleted_id
            })
        }
        return deleted_id
    }

    // Get budgets
    const fetchBudgets = async () => {
        try{
            const budgets = await appServices.fetchBudgets()
            dispatch({
                type: "SET_BUDGETS",
                payload: budgets
            })
        } catch (err) {
            dispatch({
                type: "SET_ERROR",
                payload: err.message
            })   
        }
    }

    // update budgets
    const updateBudgets = async (budgetData) => {
        try{
            const updatedBudgets = await appServices.updateBudgets(budgetData)
            dispatch({
                type: "UPDATE_BUDGETS",
                payload: updatedBudgets
            })
        } catch (err) {
            dispatch({
                type: "SET_ERROR",
                payload: err.message
            })   
        }
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        pagedTransactions: state.pagedTransactions,
        budgets: state.budgets,
        totalPages: state.totalPages,
        loading: state.loading,
        addTransaction,
        fetchAllTransactions,
        fetchPagedTransactions,
        deleteTransaction,
        fetchBudgets,
        updateBudgets
    }}>
        {children}
    </GlobalContext.Provider>)

}

export { GlobalContext, GlobalProvider}