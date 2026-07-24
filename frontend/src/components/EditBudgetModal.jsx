import React, { useState, useContext, useEffect } from 'react'
import BudgetRow from './BudgetRow'
import { GlobalContext } from '../context/GlobalState'

const EditBudgetModal = ({ setShowModal}) => {
  const { budgets, updateBudgets } = useContext(GlobalContext)

  const [ editedBudgets, setEditedBudgets] = useState([])

  useEffect(()=> {
    setEditedBudgets(budgets)
  }, [budgets])
  
  const onClose = () => {
    setShowModal(prev => !prev)
  }
  
  const onSave = async () => {
    try{
      await updateBudgets(editedBudgets)
    }catch(err){
      console.log(err)
    }
    setShowModal(prev => !prev)
  }

  const handleChange = (id, limit) => {
    setEditedBudgets(prev => prev.map(budget => budget._id === id ? {...budget, limit: limit} : budget))
  }

  return (
    <div className="fixed inset-0 bg-[#1B2A4A]/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-[#FAF7F0] rounded-lg border border-[#E5E0D5] w-full max-w-md p-6 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg font-semibold">Edit budgets</h3>
          <button className="w-8 h-8 rounded-md hover:bg-[#EFEAE0] flex items-center justify-center" onClick={onClose}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Budget rows */}
        <div className="space-y-3">
        { editedBudgets.map(budget => <BudgetRow key={budget._id} budget={budget} handleChange={handleChange}/> )}
        
         </div>

        {/* Footer buttons */}
        <div className="flex gap-2 mt-6">
          <button className="flex-1 text-sm font-medium py-2.5 rounded-md border border-[#E5E0D5] hover:bg-[#EFEAE0] transition-colors" onClick={onClose}>
            Cancel
          </button>
          <button className="flex-1 text-sm font-medium py-2.5 rounded-md bg-[#1B2A4A] text-[#FAF7F0] hover:bg-[#243761] transition-colors" onClick={onSave}>
            Save changes
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditBudgetModal