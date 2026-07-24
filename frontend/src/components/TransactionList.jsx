import Transaction from './Transaction'
import EmptyState from './EmptyState'
import { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const TransactionList = ({ transactions, currentPage, setCurrentPage }) => {
  const { totalPages } = useContext(GlobalContext)

  // if there is no transaction 
  if (transactions.length === 0) return <EmptyState />

  // on next page
  const onNext = () => {
    setCurrentPage(prev => prev + 1)
  }

  // on previous page
  const onPrev = () => {
    setCurrentPage(prev => prev - 1)
  }

  return (
    <div className="bg-white rounded-lg border border-[#E5E0D5] mt-4 shadow-[0_1px_2px_rgba(27,42,74,0.04)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[#E5E0D5] flex items-center justify-between">
        <h2 className="font-display text-base font-semibold">Recent activity</h2>
        <span className="text-xs text-[#8A8371] font-mono">{transactions.length} {transactions.length < 2 ? "entry" : "entries"} </span>
      </div>

      {transactions.length > 0 ? transactions.map(t => (<Transaction key={t._id} transaction={t} />)) : ""}



      {transactions.length > 0 && (
        <div className="px-5 py-4 border-t border-[#E5E0D5] flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={currentPage === 1}
            className="text-sm font-medium text-[#1B2A4A] disabled:opacity-40 disabled:cursor-not-allowed hover:underline"
          >
            ← Previous
          </button>

          <span className="text-xs text-[#8A8371] font-mono">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            className="text-sm font-medium text-[#1B2A4A] disabled:opacity-40 disabled:cursor-not-allowed hover:underline"
          >
            Next →
          </button>
        </div>
      )}

    </div>
  )
}

export default TransactionList