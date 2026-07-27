import React from 'react'

const CategoryBar = ({budget, totalExpensesAmount}) => {
  let usagePercent = (Math.ceil(((budget.amount) / Math.max(1, totalExpensesAmount))) * 100).toFixed(0)
  
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs w-20 shrink-0 text-[#8A8371]">{budget.category}</span>
      <div className="flex-1 h-5 rounded-sm bg-[#EFEAE0] overflow-hidden">
        <div className="h-full bg-[#1B2A4A] rounded-sm" style={{"width": usagePercent + "%"}}></div>
      </div>
      <span className="font-mono text-xs w-14 text-right">${budget.amount}</span>
    </div>
  )
}

export default CategoryBar