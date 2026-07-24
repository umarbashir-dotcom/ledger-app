import Transaction from "../models/Transaction.js";
import User from "../models/UserModal.js";

// @desc    Get transactions
// @route   GET /api/v1/transactions?page=X&limit=X
// @access  Public
const getTransactions = async (req, res) => {
    
    try {
        const userId = req.user.id
        const page = parseInt(req.query.page) || null
        const limit = parseInt(req.query.limit) || null
        
        // get transactions
        let query = Transaction.find({ userId: userId }).sort({created_at: -1})

        if(page && limit){
            query = query.skip((page-1) * limit).limit(limit)
        }

        const transactions = await query
                            
        const total = await Transaction.countDocuments({userId})
        
        res.status(200).json({
            isSuccess: true,
            data: transactions,
            total: total,
            currentPage: page || 1,
            totalPages: Math.ceil(total / limit) || 1
        })
    } catch (error) {
        res.status(500)
        throw new Error("Internal server Error")
    }

}

// @desc    Get transactions
// @route   POST /api/v1/transactions
// @access  Public
const addTransaction = async (req, res) => {
    const { description, type, category, amount } = req.body
    // Check if any required field is empty
    if (!description || !type || !category || !amount) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    try {
        // create transaction
        const newTransaction = await Transaction.create({
            userId: req.user.id,
            description,
            type,
            category,
            amount
        })
        res.status(201).json({
            success: true,
            data: newTransaction
        })
    } catch (error) {
        res.status(500)
        throw new Error("Internal server Error")
    }
}

// @desc    Update transaction
// @route   PUT /api/v1/transactions/:id
// @access  Public
const updateTransaction = async (req, res) => {
    const id = req.params.id

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(404)
        throw new Error("User not found")
    }

    // Check for authorization
    if (req.user.id !== user.id) {
        res.status(401)
        throw new Error("Unauthorized user")
    }

    const { description, type, category, amount } = req.body

    // Check if any required field is empty
    if (!description || !type || !category || !amount) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    try {
        // update transaction
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, {
            description,
            type,
            category,
            amount
        }, { new: true, runValidators: true })

        if (updatedTransaction) {
            res.status(201).json({
                success: true,
                data: updatedTransaction
            })
        } else {
            res.status(400)
            throw new Error("Transaction not found")
        }
    } catch (error) {
        res.status(500)
        throw new Error("Internal server Error")
    }
}

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
const deleteTransaction = async (req, res) => {
    const id = req.params.id
    const transaction = await Transaction.findById(id)
    // Check for transaction 
    if (!transaction) {
        res.status(400)
        throw new Error("Transaction not found")
    }


    const user = await User.findById(req.user.id)
    // Check for user
    if (!user) {
        res.status(404)
        throw new Error("User not found")
    }


    // Check for authorization
    if (req.user.id !== transaction.userId.toString()) {
        res.status(401)
        throw new Error("Unauthorized user")
    }

    try {
    // delete transaction
    const deletedTransaction = await Transaction.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        data: { id: deletedTransaction.id }
    })

} catch (error) {
    res.status(500)
    throw new Error(error.message)
}
}

export { getTransactions, addTransaction, updateTransaction, deleteTransaction }