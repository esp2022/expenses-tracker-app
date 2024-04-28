const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

module.exports = router;


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