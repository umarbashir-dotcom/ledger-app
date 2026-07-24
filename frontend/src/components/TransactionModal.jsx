import {GlobalContext} from "../context/GlobalState"
import { useState, useContext, useEffect} from "react"
import { toast } from 'react-toastify'

const TransactionModal = ({setIsModalOpen}) => {
    const { addTransaction} = useContext(GlobalContext)


    const [ formData, setFormData ] = useState({
        description: "",
        amount: "",
        type: "",
        category: "Groceries",
        date: new Date().toISOString().split('T')[0],
    })
    

    // handling input change
    const handleChange = (e) => {
        setFormData(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    // on closing form
    const onClose = () => {
        setIsModalOpen(prev => !prev)
    }

    // submitting form
    const onSave = async () => {
        try{
            await addTransaction(formData)
            toast.success(`"${formData.description}" Added Successfully`)
        } catch (err){
            console.log(err)
            toast.error(err.message)
        } finally {
            onClose()
        }
    }
    return (
        <div className="fixed inset-0 bg-[#1B2A4A]/40 backdrop-blur-sm items-center justify-center z-50 px-4">
            <div className="bg-[#FAF7F0] rounded-lg border border-[#E5E0D5] w-full max-w-md p-6 shadow-xl">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display text-lg font-semibold">New entry</h3>
                    <button className="w-8 h-8 rounded-md hover:bg-[#EFEAE0] flex items-center justify-center" onClick={onClose}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
                    </button>
                </div>

                <div className="flex gap-2 mb-4">
                    <button onClick={() => setFormData(prev => {
                        return {...prev, type: "expense"}
                    })} className={formData.type === 'expense' ? 'bg-[#1B2A4A] text-[#FAF7F0]' : 'border border-[#E5E0D5]'}>Expense</button>
                    <button className={formData.type === 'income' ? 'bg-[#1B2A4A] text-[#FAF7F0]' : 'border border-[#E5E0D5]'} onClick={() => setFormData(prev => {
                        return {...prev, type: "income"}
                    })}>Income</button>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-medium text-[#8A8371] uppercase tracking-wide">Description</label>
                        <input type="text" placeholder="e.g. Whole Foods Market" className="w-full mt-1 px-3 py-2 text-sm rounded-md border border-[#E5E0D5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20" name="description" value={formData.description} onChange={handleChange}/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-[#8A8371] uppercase tracking-wide">Amount</label>
                            <input type="number" placeholder="0.00" className="w-full mt-1 px-3 py-2 text-sm font-mono rounded-md border border-[#E5E0D5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20" name="amount" value={formData.amount} onChange={handleChange}/>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-[#8A8371] uppercase tracking-wide">Date</label>
                            <input type="date" className="w-full mt-1 px-3 py-2 text-sm rounded-md border border-[#E5E0D5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20" name="date" value={formData.date} onChange={handleChange}/>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-[#8A8371] uppercase tracking-wide">Category</label>
                        <select className="w-full mt-1 px-3 py-2 text-sm rounded-md border border-[#E5E0D5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20" name="category" value={formData.category} onChange={handleChange}>
                            <option value="Groceries">Groceries</option>
                            <option value="Rent">Rent</option>
                            <option value="Dining Out">Dining Out</option>
                            <option value="Transport">Transport</option>
                            <option value="Subscriptions">Subscriptions</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-2 mt-6">
                    <button className="flex-1 text-sm font-medium py-2.5 rounded-md border border-[#E5E0D5] hover:bg-[#EFEAE0] transition-colors" onClick={onClose}>Cancel</button>
                    <button className="flex-1 text-sm font-medium py-2.5 rounded-md bg-[#1B2A4A] text-[#FAF7F0] hover:bg-[#243761] transition-colors" onClick={onSave}>Save entry</button>
                </div>
            </div>
        </div>
    )
}

export default TransactionModal