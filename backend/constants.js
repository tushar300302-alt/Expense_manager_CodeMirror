const MEMBERS = [
    { id: 'm1', name: 'Aditya' },
    { id: 'm2', name: 'Tushar' },
    { id: 'm3', name: 'Harshad' },
];

const EXPENSE_TYPES = [
    {
        id: 'et1',
        name: '1 Time Expense',
        splits: {
            'm1': 51,   // Aditya
            'm2': 24.5, // Tushar
            'm3': 24.5, // Harshad
        },
    },
    {
        id: 'et2',
        name: 'Recurring Expense',
        splits: {
            'm1': 44, // Aditya
            'm2': 30, // Tushar
            'm3': 26, // Harshad
        },
    },
];

module.exports = { MEMBERS, EXPENSE_TYPES };
