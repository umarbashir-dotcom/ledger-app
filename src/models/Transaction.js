import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    description: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: [ "income", "expense"],
        lowercase: true   // auto-lowercases before validation
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction