import ExpenseAndIncomeTable from "../components/ExpenseAndIncomeTable.tsx"
import { Typography } from "@mui/material"
import FormDialog from "../components/FormDialog.tsx"
import { useTranslation } from "react-i18next"

function Expenses() {
    const { t } = useTranslation()

    return (
        <div className="w-full flex flex-col items-center h-full px-5">
            <div className="flex items-center gap-2 sm:gap-5 mb-5 flex-wrap justify-center">
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: { xs: "1rem", sm: "1.5rem", md: "1.5rem" },
                        textAlign: "center",
                    }}
                >
                    {t("expenses.title")}
                </Typography>
                <FormDialog
                    type="expense"
                    sx={{
                        fontSize: { xs: "0.8rem", sm: "1rem" },
                        padding: { xs: "5px 10px", sm: "8px 16px" },
                        minWidth: { xs: "auto", sm: "fit-content" },
                    }}
                />
            </div>
            <ExpenseAndIncomeTable type="expense" />
        </div>
    )
}

export default Expenses
