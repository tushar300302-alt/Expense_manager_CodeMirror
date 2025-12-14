import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { MEMBERS } from '../constants';

const COLORS = ['#00e5ff', '#ff4081', '#00e676', '#ffd740', '#7c4dff'];

export function ExpenseChart({ expenses }) {
    // Calculate total spent by each member
    const memberTotals = MEMBERS.map(member => {
        const total = expenses.reduce((sum, expense) => {
            return expense.payerId === member.id ? sum + expense.amount : sum;
        }, 0);
        return {
            name: member.name,
            value: total,
            id: member.id
        };
    }).filter(item => item.value > 0);

    if (memberTotals.length === 0) {
        return (
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h6" sx={{ color: '#00e5ff', mb: 2 }}>
                        Expense Distribution
                    </Typography>
                    <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                        No expenses to display
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <Box sx={{
                    bgcolor: 'rgba(30, 41, 59, 0.95)',
                    p: 1.5,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 1
                }}>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                        {payload[0].name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#00e5ff', fontWeight: 'bold' }}>
                        ₹{payload[0].value.toFixed(2)}
                    </Typography>
                </Box>
            );
        }
        return null;
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ color: '#00e5ff', mb: 2 }}>
                    Expense Distribution
                </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={memberTotals}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {memberTotals.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}
