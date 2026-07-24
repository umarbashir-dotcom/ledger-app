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
    console.log(req.body)
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
                            limit: budget.limit
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

export { getBudgets, updateBudget }