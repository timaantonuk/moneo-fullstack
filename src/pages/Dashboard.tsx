"use client"

import SortDropdown from "../components/SortDropdown.tsx"
import { useState } from "react"
import BarChart from "../components/BarChart.tsx"
import PieChart from "../components/PieChart.tsx"
import { Chip, CircularProgress, Typography, Box } from "@mui/material"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import { useTransactions } from "../hooks/useTransactions.ts"
import { useTranslation } from "react-i18next"

function Dashboard() {
    const [sortPeriod, setSortPeriod] = useState<"all" | "month" | "day">("all")
    const { data: transactions, isLoading, error } = useTransactions()
    const { t } = useTranslation()

    const handleSortChange = (period: "all" | "month" | "day") => {
        setSortPeriod(period)
    }

    const filteredTransactions =
        transactions?.filter((t) => {
            const today = new Date()
            const transactionDate = new Date(t.date)

            if (sortPeriod === "day") {
                return (
                    transactionDate.getDate() === today.getDate() &&
                    transactionDate.getMonth() === today.getMonth() &&
                    transactionDate.getFullYear() === today.getFullYear()
                )
            } else if (sortPeriod === "month") {
                return transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear()
            }

            return true
        }) || []

    const totalBudget = filteredTransactions.reduce((sum, t) => {
        return t.type === "income" ? sum + t.amount : sum - t.amount
    }, 0)

    if (isLoading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px", width: "100%" }}>
                <CircularProgress />
            </Box>
        )

    if (error) return <Typography color="error">{t("errors.failedToLoad", { item: "transactions" })}</Typography>

    return (
        <div className="w-full flex flex-col items-center h-full px-5">
            <div className="flex flex-col lg:flex-row w-full items-center justify-between px-4 lg:px-16 gap-4">
                <Chip
                    icon={<CurrencyExchangeIcon sx={{ fontSize: 22 }} />}
                    label={t("dashboard.totalBudget", { amount: totalBudget.toLocaleString() })}
                    sx={{
                        height: 32,
                        fontSize: "1rem",
                        paddingX: 1.5,
                        paddingY: 2.4,
                        "& .MuiChip-icon": { marginLeft: "-4px" },
                    }}
                />
                <SortDropdown onChange={handleSortChange} />
            </div>

            <div className="flex flex-col lg:flex-row gap-5 my-5 w-full">
                <BarChart transactions={filteredTransactions} sortPeriod={sortPeriod} />
                <PieChart transactions={filteredTransactions} sortPeriod={sortPeriod} />
            </div>
        </div>
    )
}

export default Dashboard

