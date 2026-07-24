import React from 'react'

const Toast = () => {
    return (
        <div className="hidden fixed bottom-6 right-6 bg-[#1B2A4A] text-[#FAF7F0] text-sm font-medium px-4 py-3 rounded-md shadow-lg items-center gap-2 z-50">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7FC49A" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
            Entry added successfully
        </div>
    )
}

export default Toast