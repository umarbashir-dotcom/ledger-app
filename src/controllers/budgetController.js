import Budget from "../models/BudgetModal.js";
import User from "../models/UserModal.js";

// @desc    Get Budgets
// @route   GET /api/v1/transactions/budgets
// @access  Private
const getBudgets = async (req, res) => {
    try {
        const userId = req.user.id

        // get transactions
        let query = Budget.find({ userId: userId })

        const budgets = await query

        res.status(200).json({
            isSuccess: true,
            data: budgets,
        })
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error("Internal server Error")
    }
}

// @desc    Update budget
// @route   PUT /api/v1/transactions/budgets/:id
// @access  Private
const updateBudget = async (req, res) => {

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
    
    const budgets = req.body


    try {
        // update budget
        await Budget.bulkWrite(
            budgets.map(budget => ({
                updateOne: {
                    filter: { _id: budget._id },
                    update: {
                        $set: {
                            category: budget.category,
                            type: budget.type,
                            limit: budget.limit || 0
                        }
                    }
                }
            }))
        );

        const updatedBudgets = await Budget.find({
            userId: req.user.id
        })
        
        if (updatedBudgets) {
            res.status(201).json({
                success: true,
                data: updatedBudgets
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

// insert default categories
const insertDefaultCategories = async (user) => {
        await Budget.insertMany([
            {
                userId: user._id,
                category: "Groceries",
                type: "expense",
                limit: 1000
            },
            {
                userId: user._id,
                category: "Dining Out",
                type: "expense",
                limit: 800
            },
            {
                userId: user._id,
                category: "Transport",
                type: "expense",
                limit: 500
            },
            {
                userId: user._id,
                category: "Subscriptions",
                type: "expense",
                limit: 500
            },
            {
                userId: user._id,
                category: "Shopping",
                type: "expense",
                limit: 500
            },
            {
                userId: user._id,
                category: "Healthcare",
                type: "expense",
                limit: 500
            },
            {
                userId: user._id,
                category: "Utilities",
                type: "expense",
                limit: 500
            },
            {
                userId: user._id,
                category: "Entertainment",
                type: "expense",
                limit: 500
            },
            {
                userId: user._id,
                category: "Education",
                type: "expense",
                limit: 500
            },
            {
                userId: user._id,
                category: "Other",
                type: "expense",
                limit: 500
            }
        ]);
}
export { getBudgets, updateBudget, insertDefaultCategories }