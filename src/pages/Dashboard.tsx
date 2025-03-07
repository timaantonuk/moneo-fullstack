import SortDropdown from "../components/SortDropdown.tsx";
import {useState} from "react";
import BarChart from "../components/BarChart.tsx";
import PieChart from "../components/PieChart.tsx";


function Dashboard() {

    const [sortPeriod, setSortPeriod] = useState<'all' | 'month' | 'day'>('all');

    const handleSortChange = (period: 'all' | 'month' | 'day') => {
        setSortPeriod(period);
        console.log('Selected period:', period);
        // Тут можешь обновлять данные или делать запрос
    };

    return (
        <div className='w-full flex flex-col items-center h-full px-5'>


            <SortDropdown onChange={handleSortChange}/>

            <div className='flex gap-5 my-5 w-full'>
                <BarChart/>
                <PieChart/>
            </div>

            {/*<div className='flex w-full justify-center gap-50 '>*/}
            {/*    <ChipStats amount={2500} variant='error' type='expenses'/>*/}
            {/*    <ChipStats amount={3000} variant='primary' type='income'/>*/}
            {/*</div>*/}


        </div>
    );
}

export default Dashboard;