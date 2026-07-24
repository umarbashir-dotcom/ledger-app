import BudgetPanel from "../components/BudgetPanel"
import Categories from "../components/Categories"
import Header from "../components/Header"
import SummaryCards from "../components/SummaryCards"
import Filters from "../components/Filters"
import TransactionModal from "../components/TransactionModal"
import Spinner from "../components/Spinner"

import { GlobalProvider } from "../context/GlobalState"
import { AuthContext } from "../context/AuthContext"
import { GlobalContext } from "../context/GlobalState"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useContext(AuthContext)
    useEffect(() => {
        if (!isAuthenticated) navigate("/login")
    }, [isAuthenticated])

    return( <GlobalProvider>
        <Header />

        <main className="max-w-6xl mx-auto px-6 mt-8">
            <SummaryCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <section className="lg:col-span-2">
                    <Filters />
                </section >
                <section className="flex flex-col gap-6">
                    <BudgetPanel />
                    <Categories />
                </section>
            </div>
        </main>

    </GlobalProvider>)

}

export default HomePage