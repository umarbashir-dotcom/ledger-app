import React, { useState, useEffect, useContext } from 'react'
import TransactionList from './TransactionList'
import EmptyState from './EmptyState'
import { GlobalContext } from '../context/GlobalState'


const Filters = () => {
    const { pagedTransactions, fetchPagedTransactions } = useContext(GlobalContext)
    const [currentPage, setCurrentPage] = useState(1)

    const [searchedText, setSearchedText] = useState("")
    const [filteredType, setFilteredType] = useState("")
    const [filteredCategory, setFilteredCategory] = useState("")
    const [descending, setDescending] = useState(false)
    console.log("filters rendered")

    const limit = 5;
    // load paged transactions on initial render 
    useEffect(() => {
        fetchPagedTransactions(currentPage, limit)
    }, [currentPage])

    if (pagedTransactions.length === 0) return <EmptyState />

    let filteredTransactions = [...pagedTransactions]

    if (searchedText) {
        filteredTransactions = filteredTransactions.filter(
            t => t.description.toLowerCase().includes(searchedText.toLowerCase()))
    }

    if (filteredType) {
        filteredTransactions = filteredTransactions.filter(t => t.type.toLowerCase() === filteredType.toLowerCase())
    }
    if (filteredCategory) {
        filteredTransactions = filteredTransactions.filter(t => t.category.toLowerCase() === filteredCategory.toLowerCase())
    }

    if (descending) {
        filteredTransactions = filteredTransactions.sort((a, b) => b.amount - a.amount)
    }


    return (
        <>
            <div className="bg-white rounded-lg border border-[#E5E0D5] p-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="relative flex-1">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A8371" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" /></svg>
                    <input type="text" placeholder="Search transactions..." className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-[#E5E0D5] bg-[#FAF7F0] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20 focus:border-[#1B2A4A] placeholder:text-[#B5AD9A]" value={searchedText} onChange={(e) => setSearchedText(e.target.value)} />
                </div>
                <select className="text-sm rounded-md border border-[#E5E0D5] bg-[#FAF7F0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20" value={filteredType} onChange={(e) => setFilteredType(e.target.value)}>
                    <option value="">All types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <select className="text-sm rounded-md border border-[#E5E0D5] bg-[#FAF7F0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20" value={filteredCategory} onChange={(e) => setFilteredCategory(e.target.value)}>
                    <option value="">All categories</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Subscriptions">Subscriptions</option>
                    <option value="Dining Out">Dining Out</option>
                    <option value="Rent">Rent</option>
                    <option value="Transport">Transport</option>
                </select>
                <button className="text-sm rounded-md border border-[#E5E0D5] px-3 py-2 hover:bg-[#EFEAE0] transition-colors flex items-center gap-1.5 text-[#1B2A4A]" onClick={() => setDescending(prev => !prev)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" /></svg>
                    Sort
                </button>
            </div>
            <TransactionList transactions={filteredTransactions} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default Filters