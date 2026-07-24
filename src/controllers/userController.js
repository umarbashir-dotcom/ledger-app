import User from "../models/UserModal.js";
import Budget from "../models/BudgetModal.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

// @desc    Register new user
// @route   POST /api/v1/users/register
// @acess   Public
const registerUser = async (req, res, next) => {
    const { name, username, email, password } = req.body

    if (!name || !username || !email || !password) {
        res.status(400) // bad request
        throw new Error("Please add all fields")
    }

    // Check if user already exists
    // by email
    let userExists = await User.findOne({ email })

    // by username
    // userExists = await User.findOne({ username })

    if (userExists) {
        res.status(400) // bad request
        throw new Error("User with this email already exists")
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword
    })

    if (user) {
        await Budget.insertMany([
            {
                userId: user._id,
                category: "Groceries",
                limit: 1000
            },
            {
                userId: user._id,
                category: "Dining Out",
                limit: 800
            },
            {
                userId: user._id,
                category: "Transport",
                limit: 500
            },
            {
                userId: user._id,
                category: "Subscriptions",
                limit: 500
            }
        ]);
        res.status(201).json({
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
            },
            token: generateToken(user.id),
            isAuthenticated: true
        })
    } else {
        res.status(400) // bad request
        throw new Error("Invalid user data")
    }
}

// @desc    Login user
// @route   POST /api/v1/users/login
// @acess   Public
const loginUser = async (req, res, next) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400) // bad request
        throw new Error("Please add all fields")
    }

    // Check if user exists
    const user = await User.findOne({ username })
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            token: generateToken(user.id),
            isAuthenticated: true
        })
    } else {
        res.status(400)
        throw new Error("Invalid username or password")
    }
}

const generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

export { registerUser, loginUser }