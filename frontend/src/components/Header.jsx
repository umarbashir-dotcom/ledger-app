import { useState, useContext } from "react"
import TransactionModal from "./TransactionModal"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Header = () => {

    const { logout } = useContext(AuthContext)
    
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ isMenuOpen, setIsMenuOpen ] = useState(false)
    
    const currentMonth = new Date().toLocaleDateString("en-US" ,{
        month: "long",
        year: "numeric"
    })

    return (
        <>
            <header className="border-b border-[#D8D2C4] bg-[#FAF7F0]/90 backdrop-blur sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-md bg-[#1B2A4A] flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4V4z" stroke="#FAF7F0" strokeWidth="1.5" /><path d="M8 9h8M8 13h8M8 17h5" stroke="#FAF7F0" strokeWidth="1.5" strokeLinecap="round" /></svg>
                        </div>
                        <div>
                            <h1 className="font-display text-xl font-semibold tracking-tight leading-none">Ledger</h1>
                            <p className="text-[11px] text-[#8A8371] tracking-wide uppercase mt-0.5">{currentMonth}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">

                        {/* <button className="w-9 h-9 rounded-full border border-[#D8D2C4] flex items-center justify-center hover:bg-[#EFEAE0] transition-colors" onClick={toggleTheme}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
                        </button> */}
                        <button className="bg-[#1B2A4A] text-[#FAF7F0] text-sm font-medium px-4 py-2.5 rounded-md hover:bg-[#243761] transition-colors flex items-center gap-2 shadow-sm" onClick={() => setIsModalOpen((prevState) => !prevState)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
                            New entry
                        </button>

                        <div className="relative">
                            <button
                                className="w-9 h-9 rounded-full border border-[#D8D2C4] flex items-center justify-center hover:bg-[#EFEAE0] transition-colors"
                                onClick={ () => setIsMenuOpen(prev => !prev) }
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" strokeWidth="1.5">
                                    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-[#FAF7F0] border border-[#D8D2C4] rounded-md shadow-md py-1 z-40">
                                    <button className="w-full text-left px-4 py-2 text-sm text-[#1B2A4A] hover:bg-[#EFEAE0] transition-colors" onClick={logout}>
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            {isModalOpen && <TransactionModal
                setIsModalOpen={setIsModalOpen} />}
        </>
    )
}

export default Header