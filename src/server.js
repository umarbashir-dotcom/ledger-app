import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import logger from "./middleware/logger.js"
import errorHandler from "./middleware/errorHandler.js"
import transactionRoute from "./routes/transactionRoute.js"
import userRoute from "./routes/userRoute.js"
import requireAuth from "./middleware/authMiddleware.js"

const port = process.env.PORT
const app = express()

// connecting DB
await connectDB()

// cors middleware
app.use(cors())

// json middleware
app.use(express.json())

// body parse middleware
app.use(express.urlencoded({extended: false}))

// logger middleware
app.use(logger)

// route Mounting for transactions
app.use("/api/v1/transactions", requireAuth, transactionRoute)

// route Mounting for user
app.use("/api/v1/users", userRoute)

// global error handler
app.use(errorHandler)

// starting server
app.listen(port, () => console.log(`Server running on port: ${port}`))