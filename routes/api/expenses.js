const express = require("express");
const expenseRouter = express.Router();
const Expense = require('../../models/Expense');
var bodyParser = require("body-parser");

//add route
expenseRouter.post("/add", async (req,res) => {
    try {
        if (!req.body.Title || !req.body.Category || !req.body.Amount || !req.body.Date) {
            return res.status(410).json({msg: "Missing an item"});
        }
        const newExpense = new Expense({ id: req.body.Id, img: req.body.Img, title: req.body.Title, category: req.body.Category, amount: req.body.Amount, date: req.body.Date});
        console.log("1");
        const savedExpense = await newExpense.save();
        console.log("2");
        res.json(savedExpense);
        console.log("3");
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});
/*
router.post('/', bodyParser.json(), (req,res) => {
    Expense.create(req.body)
        .then((expense) => res.json({msg: 'Expense added successfully'}))
        .catch((err) => res.status(400).json({error: 'Error'}));
});

router.get('/:id', (req,res) => {
    Expense.findById(req.params.id)
        .then((expense) => res.json(expense))
        .catch((err) => res.status(404).json({noexpensefound: 'No Expense found' }));
});

router.get('/', (req,res) => {
    Expense.find()
        .then((expenses) => res.json(expenses))
        .catch((err) => res.status(404).json({noexpensesfound: 'No Expenses found' }));
});

router.put('/:id', (req, res) => {
    Expense.findByIdAndUpdate(req.params.id, req.body)
    .then((expenses) => res.json({msg: 'Updated successfully'}))
    .catch((err) => res.status(400).json({error: 'Unable to update the Database'}));
});

router.delete('/:id', (req, res) => {
    Expense.findByIdAndDelete(req.params.id)
    .then((expense) => res.json({msg: 'Expense entry deleted successfully'}))
    .catch((err) => res.status(404).json({error: 'No such expense'}));
});
*/

module.exports = expenseRouter;