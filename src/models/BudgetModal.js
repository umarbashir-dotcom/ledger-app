import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    category: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: [ "income", "expense"],
        lowercase: true   // auto-lowercases before validation
    },
    limit: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Budget = mongoose.model("Budget", budgetSchema)

export default Budget