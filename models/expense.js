const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    category: {
        type: String,
    },
    title: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: String,
    },
    onEdit: {
        type: Function,
    },
    onDelete: {
        type: Function,
    },
});


module.exports = Expense = mongoose.model('expense', ExpenseSchema);