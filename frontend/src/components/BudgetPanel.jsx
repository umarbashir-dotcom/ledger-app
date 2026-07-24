import React, { useState, useContext, useEffect } from 'react'
import BudgetBar from './BudgetBar'
import EditBudgetModal from './EditBudgetModal'
import { GlobalContext } from '../context/GlobalState'

const BudgetPanel = () => {
    const { transactions, budgets, fetchBudgets } = useContext(GlobalContext)
    console.log(budgets)
    const [showModal, setShowModal] = useState(false)
    console.log(budgets)
    useEffect(()=> {
        fetchBudgets()
    }, [])
    // const [budgets, setBudgets ] = useState([
    //     {category: "Groceries", budgetLimit: 500},
    //     {category: "Dining Out", budgetLimit: 7000},
    //     {category: "Transport", budgetLimit: 600},
    //     {category: "Subscriptions", budgetLimit: 1000},
    // ])

    // it there is not transactions yet
    if(transactions.length === 0){
        return
    }
    
    // show TransactionModal it showModal is set
    if(showModal) return <EditBudgetModal setShowModal={setShowModal}/>

    return (
        <div className="bg-white rounded-lg border border-[#E5E0D5] p-5 shadow-[0_1px_2px_rgba(27,42,74,0.04)]">
            <h2 className="font-display text-base font-semibold mb-4">Monthly budgets</h2>

            <div className="space-y-4">
                { budgets.map(budget =>{
                    console.log(budget)
                    const amount = transactions
                                    .filter(t => t.category === budget.category && t.type === "expense")
                                    .reduce((acc, t) => acc + t.amount, 0)
                                    
                                    return (<BudgetBar key={budget.category} budget={{...budget, amount}} />)}
                )}
                  
                <button className="w-full mt-5 text-sm font-medium border border-[#E5E0D5] rounded-md py-2 hover:bg-[#EFEAE0] transition-colors" onClick={() => setShowModal(!showModal)}>
                    Edit budgets
                </button>
            </div>
        </div>
    )
}

export default BudgetPanel