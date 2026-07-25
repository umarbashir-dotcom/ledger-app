import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../context/AuthContext"
import favicon from "../../public/favicon.svg"

const RegisterPage = () => {
    const { register } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    })

    const [ showPassword, setShowPassword ] = useState(false)
    const navigate = useNavigate()


    const handleChange = (e) => setFormData(prevState => {
        return { ...prevState, [e.target.name]: e.target.value }
    })

    // onSubmit
    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = await register(formData)
            localStorage.setItem("token", data.token)
            navigate("/")
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">

            <div className="hidden lg:flex lg:w-[42%] bg-[#1B2A4A] ruled-lines relative flex-col justify-between p-10 xl:p-14 overflow-hidden">

                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-[#FAF7F0] flex items-center justify-center">
                        {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4V4z" stroke="#1B2A4A" strokeWidth="1.5" /><path d="M8 9h8M8 13h8M8 17h5" stroke="#1B2A4A" strokeWidth="1.5" strokeLinecap="round" /></svg> */}
                        <img src={favicon} alt="" />
                    </div>
                    <span className="font-display text-xl font-semibold text-[#FAF7F0] tracking-tight">Ledger</span>
                </div>

                <div className="relative z-10">
                    <span className="stamp inline-block text-[10px] font-bold uppercase tracking-widest border-2 border-[#C89B3C] text-[#C89B3C] px-3 py-1 rounded-sm mb-6">
                        New account
                    </span>
                    <h1 className="font-display text-4xl xl:text-5xl font-semibold text-[#FAF7F0] leading-[1.1]">
                        Every rupee,<br />accounted for.
                    </h1>
                    <p className="text-[#B9C2D6] text-sm mt-5 max-w-sm leading-relaxed">
                        Track income and expenses, set category budgets, and see exactly where your money goes each month.
                    </p>
                </div>

                <p className="relative z-10 text-[11px] text-[#7D89A8] font-mono">© 2026 Ledger. Keep your own books.</p>
            </div>

            {/* <!-- ===================== RIGHT: FORM ===================== --> */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
                <div className="w-full max-w-sm">

                    {/* <!-- Mobile-only logo --> */}
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-9 h-9 rounded-md bg-[#1B2A4A] flex items-center justify-center">
                            {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4V4z" stroke="#FAF7F0" strokeWidth="1.5" /><path d="M8 9h8M8 13h8M8 17h5" stroke="#FAF7F0" strokeWidth="1.5" strokeLinecap="round" /></svg> */}
                            <img src={favicon} alt="" />

                        </div>
                        <span className="font-display text-xl font-semibold tracking-tight">Ledger</span>
                    </div>

                    <h2 className="font-display text-2xl font-semibold">Create your account</h2>
                    <p className="text-sm text-[#8A8371] mt-1.5">Start keeping your books in under a minute.</p>

                    {/* <!-- Error banner (reference — toggle visibility conditionally) --> */}
                    <div className="hidden mt-5 bg-[#F7ECE8] border border-[#E9C9BE] rounded-md px-4 py-3 flex items-start gap-2.5">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B54834" strokeWidth="2" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                        <p className="text-sm text-[#B54834]">That username is already taken.</p>
                    </div>

                    <form className="mt-6 space-y-4" onSubmit={onSubmit}>

                        <div>
                            <label className="text-xs font-medium text-[#8A8371] uppercase tracking-wide">Full name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Umar"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full mt-1.5 px-3.5 py-2.5 text-sm rounded-md border border-[#E5E0D5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20 focus:border-[#1B2A4A] placeholder:text-[#B5AD9A]"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-[#8A8371] uppercase tracking-wide">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="umar"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full mt-1.5 px-3.5 py-2.5 text-sm rounded-md border border-[#E5E0D5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20 focus:border-[#1B2A4A] placeholder:text-[#B5AD9A]"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-[#8A8371] uppercase tracking-wide">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full mt-1.5 px-3.5 py-2.5 text-sm rounded-md border border-[#E5E0D5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20 focus:border-[#1B2A4A] placeholder:text-[#B5AD9A]"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-[#8A8371] uppercase tracking-wide">Password</label>
                            <div className="relative mt-1.5">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="At least 8 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-md border border-[#E5E0D5] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20 focus:border-[#1B2A4A] placeholder:text-[#B5AD9A]"
                                />
                                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8371] hover:text-[#1B2A4A]"
                                onClick={() => setShowPassword(prev => !prev)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#1B2A4A] text-[#FAF7F0] text-sm font-medium py-2.5 rounded-md hover:bg-[#243761] transition-colors shadow-sm mt-2"
                        >
                            Create account
                        </button>
                    </form>

                    <p className="text-sm text-[#8A8371] text-center mt-6">
                        Already have an account?
                        <Link to="/login" className="text-[#1B2A4A] font-medium hover:underline">Log in</Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default RegisterPage