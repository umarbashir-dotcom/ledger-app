import express from "express"
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "../controllers/transactionController.js"

import { getBudgets, updateBudget } from "../controllers/budgetController.js"
const router = express.Router()

router.route("/budgets").get(getBudgets).put(updateBudget)
router.route("/").get(getTransactions).post(addTransaction)

router.route("/:id").put(updateTransaction).delete(deleteTransaction)


export default router