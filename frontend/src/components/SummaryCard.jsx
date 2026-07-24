import React from 'react'

const SummaryCard = ({ label, amount, note}) => {
  // sign of amount 
  const sign = amount < 0 ? "-" : ""

  const amountValue = label === "Savings Rate" ? `${amount}%` : `$${Math.abs(amount)}`
  let amountClass = ""
  let noteClass = ""
  switch(label){
    case("Balance"):{
      amountClass = "font-mono text-2xl font-semibold mt-2 text-[#1B2A4A]"
      noteClass = "text-xs text-[#2F6F4E] mt-1 font-medium"
      break;
    }
    case("Income"):{
      amountClass = "font-mono text-2xl font-semibold mt-2 text-[#2F6F4E]"
      noteClass = "text-xs text-[#8A8371] mt-1"
      break;

    }
    case("Expenses"):{
      amountClass = "font-mono text-2xl font-semibold mt-2 text-[#B54834]"
      noteClass = "text-xs text-[#8A8371] mt-1"
      break;

    }
    case("Savings Rate"):{
      amountClass = "font-mono text-2xl font-semibold mt-2 text-[#1B2A4A]"
      noteClass = "text-xs text-[#C89B3C] mt-1 font-medium"
      break;

    } default:
      amountClass = "font-mono text-2xl font-semibold mt-2 text-[#1B2A4A]"
      noteClass = "text-xs text-[#8A8371] mt-1"
  }
  return (
    <div className="bg-white rounded-lg border border-[#E5E0D5] p-5 shadow-[0_1px_2px_rgba(27,42,74,0.04)]">
        <p className="text-[11px] uppercase tracking-wide text-[#8A8371] font-medium">{label}</p>
        <p className={amountClass}>{sign}{amountValue}</p>
        <p className={noteClass}>{note}</p>
    </div>
  )
}

export default SummaryCard