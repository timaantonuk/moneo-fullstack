import ExpenseAndIncomeTable from "../components/ExpenseAndIncomeTable.tsx";
import { Typography} from "@mui/material";
import FormDialog from "../components/FormDialog.tsx";



function Expenses() {
    return (
        <div className='w-full flex flex-col items-center h-full px-5'>
            <div className='flex items-center gap-5 mb-5'>
                <Typography variant='h5'>Total Expenses Statistics</Typography>
                <FormDialog type='expense'/>
            </div>
            <ExpenseAndIncomeTable type='expense'/>
        </div>
    );
}

export default Expenses;