const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { calculateBalances } = require('../utils/logic');

// GET /api/expenses - Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/expenses/summary - Get balance summary
// Note: This calculates summary based on ALL expenses in DB.
router.get('/summary', async (req, res) => {
    try {
        const expenses = await Expense.find();
        const summary = calculateBalances(expenses);
        res.json(summary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/expenses - Add new expense
router.post('/', async (req, res) => {
    const { date, note, amount, payerId, typeId } = req.body;

    const expense = new Expense({
        date,
        note,
        amount,
        payerId,
        typeId
    });

    try {
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/expenses/:id - Delete expense
router.delete('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found' });

        await expense.deleteOne();
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
