import SummaryCard from "./SummaryCard"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../context/GlobalState"
import Spinner from "./Spinner"

const SummaryCards = () => {
  const { fetchAllTransactions, transactions, loading} = useContext(GlobalContext)
  
  useEffect(() => {
    fetchAllTransactions()
  }, [])

  if (loading)
    return <Spinner />
    
  // calculating total income
  const totalIncome = transactions
    .filter(transaction => transaction.type === "income")
    .reduce((acc, t) => acc + t.amount, 0)

  // calculating total expenses
  const totalExpense = transactions
    .filter(transaction => transaction.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0)

  // Total Balance
  const Balance = totalIncome - totalExpense

  let savingRate = ((totalIncome - totalExpense) / Math.max(1, totalIncome) ) * 100;
  
  // if saving is zero
  savingRate = savingRate < 0 ? 0 : savingRate
  
  const cards = [
    { label: "Balance", amount: Balance.toFixed(2), note: "total balance" },
    { label: "Income", amount: totalIncome.toFixed(2), note: transactions.filter(t => t.type === "income").length + (transactions.filter(t => t.type === "income").length > 1 ? " sources this month" : " source this month")},
    { label: "Expenses", amount: totalExpense.toFixed(2), note: transactions.filter(t => t.type === "expense").length +  (transactions.filter(t => t.type === "expense").length > 1 ?  " transactions" : " transaction") },
    { label: "Savings Rate", amount: savingRate.toFixed(2), note: "Goal 40%"}
  ]

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {transactions.length > 0 ?
          cards.map(card => (<SummaryCard key={card.label} label={card.label} amount={card.amount} note={card.note} />))
          : ""
        }

      </section>
    </>
  )
}

export default SummaryCards