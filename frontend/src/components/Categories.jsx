import React from 'react'
import CategoryBar from './CategoryBar'
import { GlobalContext } from '../context/GlobalState'
import { useContext } from 'react'

const Categories = () => {
  const { transactions } = useContext(GlobalContext)
  
  if (transactions.length === 0) {
    return
  }

  const groceriesAmount = transactions
    .filter(t => t.category === "Groceries" && t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  const diningOutAmount = transactions
    .filter(t => t.category === "Dining Out" && t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  const transportAmount = transactions
    .filter(t => t.category === "Transport" && t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  const subscriptionAmount = transactions
    .filter(t => t.category === "Subscriptions" && t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  const rentAmount = transactions
    .filter(t => t.category === "Rent" && t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  const totalExpensesAmount = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  const budgetData = [
    { category: "Groceries", amount: groceriesAmount},
    { category: "Dining Out", amount: diningOutAmount},
    { category: "Transport", amount: transportAmount},
    { category: "Subscriptions", amount: subscriptionAmount},
    { category: "Rent", amount: rentAmount },

  ]

  return (
    <div className="bg-white rounded-lg border border-[#E5E0D5] p-5 shadow-[0_1px_2px_rgba(27,42,74,0.04)]">
      <h2 className="font-display text-base font-semibold mb-4">Spending by category</h2>
      <div className="space-y-3">
        { budgetData.map(b => <CategoryBar key={b.category} budgetData={b} totalExpensesAmount={totalExpensesAmount}/>) }
      </div>
    </div>
  )
}

export default Categories