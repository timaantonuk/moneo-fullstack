import {Typography} from "@mui/material";
import FormDialog from "../components/FormDialog.tsx";
import ExpenseAndIncomeTable from "../components/ExpenseAndIncomeTable.tsx";


function Income() {
    return (
        <div className='w-full flex flex-col items-center h-full px-5'>
            <div className='flex items-center gap-5 mb-5'>
                <Typography variant='h5'>Total Income Statistics</Typography>
                <FormDialog type='income'/>
            </div>
            <ExpenseAndIncomeTable/>
        </div>
    );
}

export default Income;