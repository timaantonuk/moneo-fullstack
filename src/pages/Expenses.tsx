import ExpenseAndIncomeTable from "../components/ExpenseAndIncomeTable.tsx"
import { Typography } from "@mui/material"
import FormDialog from "../components/FormDialog.tsx"
import { useTranslation } from "react-i18next"

function Expenses() {
    const { t } = useTranslation()

    return (
        <div className="w-full flex flex-col items-center h-full px-5">
            <div className="flex items-center gap-5 mb-5">
                <Typography variant="h5">{t("expenses.title")}</Typography>
                <FormDialog type="expense" />
            </div>
            <ExpenseAndIncomeTable type="expense" />
        </div>
    )
}

export default Expenses

