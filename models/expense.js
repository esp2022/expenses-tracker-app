const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    id: {
        type: String,
        required:true
    },
    img: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});


module.exports = Expense = mongoose.model('Expense', expenseSchema);