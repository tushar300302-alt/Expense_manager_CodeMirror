const { MEMBERS, EXPENSE_TYPES } = require('../constants');

function calculateBalances(expenses) {
    // Initialize balances
    const balances = {};
    MEMBERS.forEach(m => {
        balances[m.id] = {
            name: m.name,
            paid: 0,
            share: 0,
            net: 0,
        };
    });

    expenses.forEach(expense => {
        const amount = parseFloat(expense.amount);
        if (isNaN(amount)) return;

        // Add to payer's paid amount
        if (balances[expense.payerId]) {
            balances[expense.payerId].paid += amount;
        }

        // Calculate shares based on expense type
        const expenseType = EXPENSE_TYPES.find(et => et.id === expense.typeId);
        if (expenseType) {
            MEMBERS.forEach(member => {
                const percentage = expenseType.splits[member.id] || 0;
                const memberShare = (amount * percentage) / 100;
                balances[member.id].share += memberShare;
            });
        }
    });

    // Calculate net balance
    MEMBERS.forEach(m => {
        balances[m.id].net = balances[m.id].paid - balances[m.id].share;
    });

    return balances;
}

module.exports = { calculateBalances };
