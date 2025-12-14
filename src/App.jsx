import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AddExpenseForm } from './components/AddExpenseForm';
import { Summary } from './components/Summary';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseChart } from './components/ExpenseChart';
import { DateFilter } from './components/DateFilter';
import { fetchExpenses, fetchSummary, createExpense } from './api';

// Custom Electric Dark Theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff', // Electric Cyan
    },
    secondary: {
      main: '#ff4081', // Neon Pink
    },
    background: {
      default: '#0a1929', // Deep Dark Blue
      paper: 'rgba(10, 25, 41, 0.7)', // Glassy Dark
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      background: 'linear-gradient(45deg, #00e5ff 30%, #ff4081 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(30, 41, 59, 0.7)', // Semi-transparent
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#00e5ff',
          fontWeight: 700,
          textTransform: 'uppercase',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: '#00e5ff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00e5ff',
            },
          },
        },
      },
    },
  },
});

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  // Date filter state
  const currentDate = new Date();
  const [filterType, setFilterType] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState((currentDate.getMonth() + 1).toString().padStart(2, '0'));
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());

  const loadData = async () => {
    try {
      const expensesData = await fetchExpenses();
      const summaryData = await fetchSummary();
      setExpenses(expensesData);
      setSummary(summaryData);
    } catch (err) {
      console.error(err);
      setError('Failed to load data. Ensure backend is running.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddExpense = async (newExpense) => {
    try {
      await createExpense(newExpense);
      await loadData();
    } catch (err) {
      console.error(err);
      alert('Failed to add expense');
    }
  };

  const handleFilterChange = (updates) => {
    if (updates.filterType !== undefined) setFilterType(updates.filterType);
    if (updates.selectedMonth !== undefined) setSelectedMonth(updates.selectedMonth);
    if (updates.selectedYear !== undefined) setSelectedYear(updates.selectedYear);
  };

  // Filter expenses based on selected filter
  const filteredExpenses = expenses.filter(expense => {
    if (filterType === 'all') return true;

    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear().toString();
    const expenseMonth = (expenseDate.getMonth() + 1).toString().padStart(2, '0');

    if (filterType === 'year') {
      return expenseYear === selectedYear;
    } else if (filterType === 'month') {
      return expenseYear === selectedYear && expenseMonth === selectedMonth;
    }
    return true;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        position: 'relative',
        py: 4
      }}>
        {/* Date Filter - Fixed in Top Left Corner */}
        <Box sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}>
          <DateFilter
            filterType={filterType}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onFilterChange={handleFilterChange}
          />
        </Box>

        {/* Centered Content Container */}
        <Container maxWidth="xl" sx={{ width: '100%', px: 3 }}>
          <Box sx={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Typography variant="h4" component="h1" align="center" sx={{ mb: 4, width: '100%' }}>
              Team Expense Manager
            </Typography>

            {error && (
              <Typography color="error" align="center" sx={{ mb: 2, width: '100%' }}>
                {error}
              </Typography>
            )}

            <Box sx={{ width: '100%' }}>
              <Grid container spacing={3} justifyContent="center">
                {/* Left Column: Add Expense */}
                <Grid item xs={12} lg={3}>
                  <AddExpenseForm onAddExpense={handleAddExpense} />
                </Grid>

                {/* Right Column: Summary + Chart stacked vertically */}
                <Grid item xs={12} lg={9}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Summary balances={summary} />
                    </Grid>
                    <Grid item xs={12}>
                      <ExpenseChart expenses={filteredExpenses} />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Full Width Row: Expense List */}
                <Grid item xs={12}>
                  <ExpenseList expenses={filteredExpenses} />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;