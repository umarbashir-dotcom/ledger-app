import React from 'react'

const BudgetBar = ({ budget }) => {

    // default barClass --> green 
    let barClass = "h-full bg-[#2F6F4E] rounded-full"
    let amountClass = "font-mono text-xs text-[#8A8371]"
    let usagePercent = ((budget.amount / budget.limit) * 100)

    const getOverBudgetLabel = (amount, budgetLimit) => {
        let overAmount = amount - budgetLimit
        let overPercent = (overAmount) / budgetLimit * 100
        let multiplier = amount / budgetLimit

        if (overPercent <= 100) {
            return `${overPercent.toFixed(2)}% over budget`
        }
        return `${multiplier.toFixed(1)}x your budget ($${overAmount.toLocaleString()} over)`
    }


    if (usagePercent >= 100) {
        barClass = "h-full bg-[#B54834] rounded-full"
        amountClass = "font-mono text-xs text-[#B54834]"
    } else if (usagePercent >= 50) {
        // yellow
        barClass = "h-full bg-[#C89B3C] rounded-full"
    }

    return (
        <div>
            <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-sm font-medium">{budget.category}</span>
                <span className={amountClass}>${budget.amount}/ ${budget.limit}</span>
            </div>
            <div className="h-2 rounded-full bg-[#EFEAE0] overflow-hidden">
                <div className={barClass} style={{ width: usagePercent + "%" }}></div>
            </div>

            {usagePercent < 50 && (<span className="text-[11px] font-medium text-[#2F6F4E]">
                {usagePercent.toFixed(0)}% used
            </span>)}

            {usagePercent >= 50 && usagePercent < 100 && (<span className="text-[11px] font-medium text-[#C89B3C]">
                {usagePercent.toFixed(0)}% used
            </span>)}
            {usagePercent >= 100 && (<p className="text-[11px] text-[#B54834] mt-1 font-medium">{getOverBudgetLabel(budget.amount, budget.limit)}</p>)}
        </div>
    )
}

export default BudgetBar