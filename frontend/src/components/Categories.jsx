import React from 'react'
import CategoryBar from './CategoryBar'
import { GlobalContext } from '../context/GlobalState'
import { useContext } from 'react'

const Categories = () => {
  const { transactions ,budgets, fetchBudgets} = useContext(GlobalContext)
  const expenseBudgets = budgets.filter(budget => budget.type === "expense")

  if (transactions.length === 0) {
    return
  }

  const totalExpensesAmount = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  return (
    <div className="bg-white rounded-lg border border-[#E5E0D5] p-5 shadow-[0_1px_2px_rgba(27,42,74,0.04)]">
      <h2 className="font-display text-base font-semibold mb-4">Spending by category</h2>
      <div className="space-y-3">
        { expenseBudgets.map(budget => {
          const amount = transactions
                                  .filter(t => t.category === budget.category)
                                  .reduce((acc, t) => acc + t.amount, 0)

          return (<CategoryBar key={budget.category} budget={{...budget, amount: amount }} totalExpensesAmount={totalExpensesAmount}/>)
        }) }
      </div>
    </div>
  )
}

export default Categories