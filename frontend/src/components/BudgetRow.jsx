import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

const BudgetRow = ({budget, handleChange}) => {
  
  return (
    <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-medium">{budget.category}</label>
            <div className="relative w-28">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8A8371]">$</span>
              <input
                type="number"
                min="0"
                value={budget.limit}
                onChange={(e) =>  handleChange(budget._id, Number(e.target.value))}
                className="w-full pl-6 pr-3 py-2 text-sm font-mono rounded-md border border-[#E5E0D5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20"
              />
            </div>
          </div>
  )
}

export default BudgetRow