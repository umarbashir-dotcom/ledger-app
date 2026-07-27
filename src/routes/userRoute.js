import express from "express"
import { registerUser, loginUser, getMe } from "../controllers/userController.js"
import requireAuth from "../middleware/authMiddleware.js"
import { get } from "mongoose"

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

// authenticating user
router.use(requireAuth)
router.get("/me", getMe)

export default router