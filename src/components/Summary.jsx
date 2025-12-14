import { MEMBERS } from '../constants';
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
    Box
} from '@mui/material';

export function Summary({ balances }) {
    if (!balances) return null;

    // Calculate settlements - who owes money to whom
    const calculateSettlements = () => {
        const settlements = [];
        const debtors = []; // People who owe money (negative balance)
        const creditors = []; // People who should receive money (positive balance)

        // Separate debtors and creditors
        MEMBERS.forEach(member => {
            const balance = balances[member.id]?.net || 0;
            if (balance < 0) {
                debtors.push({ id: member.id, name: member.name, amount: Math.abs(balance) });
            } else if (balance > 0) {
                creditors.push({ id: member.id, name: member.name, amount: balance });
            }
        });

        // Calculate direct settlements
        debtors.forEach(debtor => {
            creditors.forEach(creditor => {
                if (debtor.amount > 0 && creditor.amount > 0) {
                    const settleAmount = Math.min(debtor.amount, creditor.amount);
                    settlements.push({
                        from: debtor.name,
                        to: creditor.name,
                        amount: settleAmount
                    });
                    debtor.amount -= settleAmount;
                    creditor.amount -= settleAmount;
                }
            });
        });

        return settlements;
    };

    const settlements = calculateSettlements();

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{
                    p: 2,
                    pb: 1,
                    background: 'linear-gradient(90deg, rgba(0, 229, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    <Typography variant="h6" sx={{ color: '#00e5ff' }}>Summary</Typography>
                </Box>
                <TableContainer sx={{ flexGrow: 1 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
                                <TableCell>Member</TableCell>
                                <TableCell align="right">Paid</TableCell>
                                <TableCell align="right">Share</TableCell>
                                <TableCell align="right">Net Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {MEMBERS.map(member => {
                                const data = balances[member.id];
                                const isPositive = data.net > 0;
                                const isNegative = data.net < 0;

                                return (
                                    <TableRow key={member.id}>
                                        <TableCell component="th" scope="row" sx={{ color: 'text.primary' }}>
                                            {member.name}
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontFamily: 'monospace' }}>₹{data.paid.toFixed(2)}</TableCell>
                                        <TableCell align="right" sx={{ fontFamily: 'monospace' }}>₹{data.share.toFixed(2)}</TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                color: isPositive ? '#00e676' : isNegative ? '#ff1744' : 'text.secondary',
                                                fontWeight: 'bold',
                                                fontFamily: 'monospace'
                                            }}
                                        >
                                            {isPositive ? '+₹' : isNegative ? '-₹' : '₹'}{Math.abs(data.net).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Settlements Section */}
                {settlements.length > 0 && (
                    <Box sx={{
                        p: 2,
                        pt: 2,
                        borderTop: '2px solid rgba(255, 255, 255, 0.1)',
                        bgcolor: 'rgba(0, 229, 255, 0.03)'
                    }}>
                        <Typography variant="subtitle2" sx={{ color: '#00e5ff', mb: 1.5, fontWeight: 'bold' }}>
                            Settlements
                        </Typography>
                        {settlements.map((settlement, index) => (
                            <Typography
                                key={index}
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    mb: 0.5,
                                    fontSize: '0.875rem'
                                }}
                            >
                                <span style={{ color: '#ff4081' }}>{settlement.from}</span>
                                {' owes '}
                                <span style={{ color: '#00e676', fontWeight: 'bold' }}>₹{settlement.amount.toFixed(2)}</span>
                                {' to '}
                                <span style={{ color: '#00e5ff' }}>{settlement.to}</span>
                            </Typography>
                        ))}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
