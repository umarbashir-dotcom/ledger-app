import React from 'react'

const Spinner = ({ text = "Loading..." }) => {
    return (
        <div className="fixed top-[84px] left-0 right-0 bottom-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F0]">
            <div className="relative h-14 w-14">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-[#E5E0D5]"></div>

                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#1B2A4A] border-r-[#1B2A4A] animate-spin"></div>
            </div>

            <p className="mt-6 text-sm font-medium tracking-wide text-[#1B2A4A]">
                {text}
            </p>
        </div>
    );
};

export default Spinner;
