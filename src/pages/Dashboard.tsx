import SortDropdown from "../components/SortDropdown.tsx";
import {useState} from "react";
import BarChart from "../components/BarChart.tsx";
import PieChart from "../components/PieChart.tsx";
import {Chip} from "@mui/material";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';


function Dashboard() {

    const [sortPeriod, setSortPeriod] = useState<'all' | 'month' | 'day'>('all');

    const handleSortChange = (period: 'all' | 'month' | 'day') => {
        setSortPeriod(period);
        console.log('Selected period:', period);
    };

    return (
        <div className='w-full flex flex-col items-center h-full px-5'>

            <div className='flex w-full items-center justify-between px-16'>

                <Chip
                    icon={<CurrencyExchangeIcon sx={{ fontSize: 22 }} />}
                    label="Your total budget: 4600$"
                    sx={{
                        height: 32,
                        fontSize: '1rem',
                        paddingX: 1.5,
                        paddingY: 2.4,
                        '& .MuiChip-icon': {
                            marginLeft: '-4px',
                        },
                    }}
                />


                <SortDropdown onChange={handleSortChange}/>
            </div>

            <div className='flex gap-5 my-5 w-full'>
                <BarChart/>
                <PieChart/>
            </div>


        </div>
    );
}

export default Dashboard;