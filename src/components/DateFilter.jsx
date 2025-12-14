import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export function DateFilter({ filterType, selectedMonth, selectedYear, onFilterChange }) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
    ];

    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>View</InputLabel>
                <Select
                    value={filterType}
                    label="View"
                    onChange={(e) => onFilterChange({ filterType: e.target.value })}
                >
                    <MenuItem value="all">All Time</MenuItem>
                    <MenuItem value="month">Specific Month</MenuItem>
                    <MenuItem value="year">Specific Year</MenuItem>
                </Select>
            </FormControl>

            {filterType === 'month' && (
                <>
                    <FormControl size="small" sx={{ minWidth: 130 }}>
                        <InputLabel>Month</InputLabel>
                        <Select
                            value={selectedMonth}
                            label="Month"
                            onChange={(e) => onFilterChange({ selectedMonth: e.target.value })}
                        >
                            {months.map(month => (
                                <MenuItem key={month.value} value={month.value}>
                                    {month.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 100 }}>
                        <InputLabel>Year</InputLabel>
                        <Select
                            value={selectedYear}
                            label="Year"
                            onChange={(e) => onFilterChange({ selectedYear: e.target.value })}
                        >
                            {years.map(year => (
                                <MenuItem key={year} value={year.toString()}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            )}

            {filterType === 'year' && (
                <FormControl size="small" sx={{ minWidth: 100 }}>
                    <InputLabel>Year</InputLabel>
                    <Select
                        value={selectedYear}
                        label="Year"
                        onChange={(e) => onFilterChange({ selectedYear: e.target.value })}
                    >
                        {years.map(year => (
                            <MenuItem key={year} value={year.toString()}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </Box>
    );
}
