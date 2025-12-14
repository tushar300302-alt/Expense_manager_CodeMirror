const API_BASE_URL = 'https://expense-backend-neon.vercel.app/api/expenses';

export const fetchExpenses = async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch expenses');
    }
    return response.json();
};

export const fetchSummary = async () => {
    const response = await fetch(`${API_BASE_URL}/summary`);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch summary');
    }
    return response.json();
};

export const createExpense = async (expenseData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create expense');
    }
    return response.json();
};
