import { useState } from 'react';
import { MEMBERS, EXPENSE_TYPES } from '../constants';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    MenuItem,
    Button,
    Box,
    InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export function AddExpenseForm({ onAddExpense }) {
    const [amount, setAmount] = useState('');
    const [typeId, setTypeId] = useState('et2'); // Default to Recurring Expense
    const [payerId, setPayerId] = useState(''); // No default
    const [note, setNote] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all required fields including description
        if (!amount || !typeId || !payerId || !note) {
            alert('Please fill in all required fields including description');
            return;
        }

        onAddExpense({
            amount: parseFloat(amount),
            typeId,
            payerId,
            note,
            date,
        });

        setAmount('');
        setNote('');
        // Keep typeId as et2 for next entry
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#00e5ff' }}>
                    Add Expense
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: <InputAdornment position="start" sx={{ color: 'text.secondary' }}>₹</InputAdornment>,
                        }}
                    />

                    <TextField
                        select
                        label="Expense Type"
                        value={typeId}
                        onChange={(e) => setTypeId(e.target.value)}
                        fullWidth
                        size="small"
                    >
                        {EXPENSE_TYPES.map(type => (
                            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Paid By"
                        value={payerId}
                        onChange={(e) => setPayerId(e.target.value)}
                        required
                        fullWidth
                        size="small"
                    >
                        {MEMBERS.map(member => (
                            <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Description"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        required
                        fullWidth
                        size="small"
                        placeholder="Salary, Device, etc."
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<AddIcon />}
                        fullWidth
                        disableElevation
                        sx={{
                            mt: 1,
                            background: 'linear-gradient(45deg, #00e5ff 30%, #2979ff 90%)',
                            color: '#000',
                            fontWeight: 'bold',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #00b8d4 30%, #2962ff 90%)',
                            }
                        }}
                    >
                        Add Expense
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
