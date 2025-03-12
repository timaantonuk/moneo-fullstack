import { Typography } from "@mui/material"
import FormDialog from "../components/FormDialog.tsx"
import ExpenseAndIncomeTable from "../components/ExpenseAndIncomeTable.tsx"
import { useTranslation } from "react-i18next"

function Income() {
    const { t } = useTranslation()

    return (
        <div className="w-full flex flex-col items-center h-full px-5">
            <div className="flex items-center gap-5 mb-5">
                <Typography variant="h5">{t("income.title")}</Typography>
                <FormDialog type="income" />
            </div>
            <ExpenseAndIncomeTable type="income" />
        </div>
    )
}

export default Income

