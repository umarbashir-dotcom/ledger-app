import {
    ShoppingCart,
    Home,
    Bus,
    Tv,
    UtensilsCrossed,
    Plug,
    Wallet,
    Briefcase,
    HeartPulse,
    Film,
    GraduationCap,
    ShoppingBag,
    DollarSign,
    Building2,
    TrendingUp,
    Gift,
    BadgeDollarSign,
    RotateCcw
} from 'lucide-react';
import { toast } from 'react-toastify';
import formatTransactionDate from '../utils/format';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const categoryIcons = {
    // Expense Categories
    Groceries: ShoppingCart,
    Rent: Home,
    "Dining Out": UtensilsCrossed,
    Transport: Bus,
    Subscriptions: Tv,
    Utilities: Plug,
    Healthcare: HeartPulse,
    Entertainment: Film,
    Education: GraduationCap,
    Shopping: ShoppingBag,
    Other: Wallet,

    // Income Categories
    Salary: DollarSign,
    Freelancing: Briefcase,
    Business: Building2,
    Investment: TrendingUp,
    Gift: Gift,
    Bonus: BadgeDollarSign,
    Refund: RotateCcw,
};


const Transaction = ({ transaction}) => {
    const { deleteTransaction } = useContext(GlobalContext)

    // icon components
    const IconComponent = categoryIcons[transaction.category] || Wallet
    const iconColor = transaction.type === 'expense' ? '#B54834' : '#2F6F4E';

    // default classes for income type
    let bgClass = "w-10 h-10 rounded-md bg-[#EAF3EC] flex items-center justify-center shrink-0"
    let typeClass = "stamp shrink-0 text-[9px] font-bold uppercase tracking-wider border-2 border-[#2F6F4E] text-[#2F6F4E] px-2 py-0.5 rounded-sm"
    let amountClass = "font-mono text-sm font-semibold text-[#2F6F4E] w-24 text-right shrink-0"

    // sign of amount 
    let sign = transaction.type === "income" ? '+' : '-'

    // classes if transaction type is expense
    if (transaction.type === "expense") {
        bgClass = "w-10 h-10 rounded-md bg-[#F7ECE8]  flex items-center justify-center shrink-0"
        typeClass = "stamp shrink-0 text-[9px] font-bold uppercase tracking-wider border-2 border-[#B54834] text-[#B54834] px-2 py-0.5 rounded-sm"
        amountClass = "font-mono text-sm font-semibold text-[#B54834] w-24 text-right shrink-0"
    }

    // onDelete
    const onDelete = async (id) => {
        if (!confirm(`Are you sure to delete "${transaction.description}"`)) {
            return
        }

        try {
            let deleted_id = await deleteTransaction(id)
            toast.success(`"${transaction.description}" Deleted Successfully`)
        } catch(err){
            toast.error(err.message)
        }      
    }

    return (

        <div className="receipt-row px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-[#FAF7F0]/60 transition-colors group">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={bgClass}>
                    <IconComponent size={16} color={iconColor} strokeWidth={1.7} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{transaction.description}</p>
                    <p className="text-xs text-[#8A8371] mt-0.5">
                        {transaction.category} · {formatTransactionDate(transaction.created_at)}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:shrink-0 pl-[52px] sm:pl-0">
                <span className={typeClass}>{transaction.type}</span>
                <p className={amountClass}>{sign}${transaction.amount}</p>
                <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex gap-1 shrink-0">

                    {/* Edit Button */}
                    {/* <button
                        // onClick={() => onEdit(transaction)}
                        className="w-7 h-7 rounded-md hover:bg-[#EFEAE0] flex items-center justify-center"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8A8371" strokeWidth="2">
                            <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                    </button> */}

                    {/*  Delete button*/}
                    <button
                        onClick={() => onDelete(transaction._id)}
                        className="w-7 h-7 rounded-md hover:bg-[#F7ECE8] flex items-center justify-center"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B54834" strokeWidth="2">
                            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>


    )
}

export default Transaction

