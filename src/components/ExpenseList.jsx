import { MEMBERS, EXPENSE_TYPES } from '../constants';
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Box
} from '@mui/material';

export function ExpenseList({ expenses }) {
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    const getMemberName = (id) => MEMBERS.find(m => m.id === id)?.name || 'Unknown';
    const getTypeName = (id) => EXPENSE_TYPES.find(t => t.id === id)?.name || 'Unknown';

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <Card>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Box sx={{
                    p: 2,
                    pb: 1,
                    background: 'linear-gradient(90deg, rgba(255, 64, 129, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    <Typography variant="h6" sx={{ color: '#ff4081' }}>Expense History</Typography>
                </Box>
                {sortedExpenses.length === 0 ? (
                    <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                        No expenses recorded yet.
                    </Typography>
                ) : (
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table size="small" stickyHeader>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#1e293b' }}>
                                    <TableCell sx={{ bgcolor: '#1e293b' }}>Date</TableCell>
                                    <TableCell sx={{ bgcolor: '#1e293b' }}>Description</TableCell>
                                    <TableCell sx={{ bgcolor: '#1e293b' }}>Type</TableCell>
                                    <TableCell sx={{ bgcolor: '#1e293b' }}>Paid By</TableCell>
                                    <TableCell align="right" sx={{ bgcolor: '#1e293b' }}>Amount</TableCell>
                                    {MEMBERS.map(m => (
                                        <TableCell key={m.id} align="right" sx={{ color: '#00e5ff', fontWeight: 500, bgcolor: '#1e293b' }}>
                                            {m.name}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedExpenses.map(expense => {
                                    const type = EXPENSE_TYPES.find(t => t.id === expense.typeId);
                                    return (
                                        <TableRow key={expense.id} hover sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05) !important' } }}>
                                            <TableCell sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                                                {new Date(expense.date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                {expense.note || <Typography variant="caption" color="text.disabled" fontStyle="italic">No description</Typography>}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={type?.name || 'Unknown'}
                                                    size="small"
                                                    sx={{
                                                        borderColor: expense.typeId === 'et2' ? '#00e676' : 'rgba(255, 255, 255, 0.2)',
                                                        color: expense.typeId === 'et2' ? '#00e676' : 'text.secondary'
                                                    }}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>{getMemberName(expense.payerId)}</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                                                ₹{expense.amount.toFixed(2)}
                                            </TableCell>
                                            {MEMBERS.map(m => {
                                                const pct = type?.splits[m.id] || 0;
                                                const share = (expense.amount * pct) / 100;
                                                return (
                                                    <TableCell key={m.id} align="right" sx={{ color: 'text.secondary', fontSize: '0.875rem', fontFamily: 'monospace' }}>
                                                        ₹{share.toFixed(2)}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                                <TableRow sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                                    <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#ff4081' }}>
                                        Total
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#ff4081', fontFamily: 'monospace' }}>
                                        ₹{totalAmount.toFixed(2)}
                                    </TableCell>
                                    {MEMBERS.map(m => {
                                        const totalShare = expenses.reduce((sum, expense) => {
                                            const type = EXPENSE_TYPES.find(t => t.id === expense.typeId);
                                            const pct = type?.splits[m.id] || 0;
                                            return sum + ((expense.amount * pct) / 100);
                                        }, 0);
                                        return (
                                            <TableCell key={m.id} align="right" sx={{ fontWeight: 'bold', color: '#ff4081', fontFamily: 'monospace' }}>
                                                ₹{totalShare.toFixed(2)}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </CardContent>
        </Card>
    );
}
