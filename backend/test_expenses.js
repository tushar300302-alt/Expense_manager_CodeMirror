const mongoose = require('mongoose');
const Expense = require('./models/Expense');
require('dotenv').config();

async function test() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✓ Connected');

        console.log('Fetching expenses...');
        const expenses = await Expense.find().sort({ date: -1 });
        console.log('✓ Found', expenses.length, 'expenses');
        console.log('Expenses:', JSON.stringify(expenses, null, 2));

        process.exit(0);
    } catch (err) {
        console.error('✗ Error:', err);
        process.exit(1);
    }
}

test();
