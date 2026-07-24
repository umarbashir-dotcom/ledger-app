import React from 'react'

const EmptyState = () => {
    return (
        <div className="bg-white rounded-lg border border-dashed border-[#D8D2C4] mt-4 py-14 text-center">
            <div className="w-11 h-11 rounded-full bg-[#EFEAE0] flex items-center justify-center mx-auto">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A8371" strokeWidth="1.7"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
            </div>
            <p className="font-display text-base font-semibold mt-3">No transactions found.Add transactions first if you didn't add yet.</p>
            <p className="font-display text-base font-semibold mt-3"> OR </p>
            <p className="text-sm text-[#8A8371] mt-1">Try a different search term or clear your filters, if you applied any filter</p>
        </div>
    )
}

export default EmptyState