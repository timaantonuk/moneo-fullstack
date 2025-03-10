import React, { useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

type SortPeriod = 'all' | 'month' | 'day';

function SortDropdown({ onChange }: { onChange: (period: SortPeriod) => void }) {
    const [sortPeriod, setSortPeriod] = useState<SortPeriod>('all');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const period = event.target.value as SortPeriod;
        setSortPeriod(period);
        onChange(period);
    };

    return (
        <FormControl variant="outlined" size="small" className='justify-self-end self-end'>
            <InputLabel id="sort-by-label">Sort by</InputLabel>
            <Select
                labelId="sort-by-label"
                value={sortPeriod}
                onChange={handleChange}
                label="Sort by"
            >
                <MenuItem value="all">All Time (default)</MenuItem>
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="day">Day</MenuItem>
            </Select>
        </FormControl>
    );
}

export default SortDropdown;
