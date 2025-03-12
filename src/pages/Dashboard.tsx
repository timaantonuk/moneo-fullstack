import SortDropdown from "../components/SortDropdown.tsx";
import { useState } from "react";
import BarChart from "../components/BarChart.tsx";
import PieChart from "../components/PieChart.tsx";
import { Chip, CircularProgress, Typography } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useTransactions } from "../hooks/useTransactions.ts";

function Dashboard() {
    const [sortPeriod, setSortPeriod] = useState<"all" | "month" | "day">("all");
    const { data: transactions, isLoading, error } = useTransactions();

    const handleSortChange = (period: "all" | "month" | "day") => {
        setSortPeriod(period);
    };

    // 🔥 Фильтруем транзакции по выбранному периоду
    const filteredTransactions = transactions?.filter((t) => {
        const today = new Date();
        const transactionDate = new Date(t.date);

        if (sortPeriod === "day") {
            return (
                transactionDate.getDate() === today.getDate() &&
                transactionDate.getMonth() === today.getMonth() &&
                transactionDate.getFullYear() === today.getFullYear()
            );
        } else if (sortPeriod === "month") {
            return (
                transactionDate.getMonth() === today.getMonth() &&
                transactionDate.getFullYear() === today.getFullYear()
            );
        }

        return true; // "all" показывает все данные
    });

    // 🔥 Считаем бюджет: (доход - расходы)
    const totalBudget = filteredTransactions?.reduce((sum, t) => {
        return t.type === "income" ? sum + t.amount : sum - t.amount;
    }, 0) || 0;

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load transactions</Typography>;

    return (
        <div className="w-full flex flex-col items-center h-full px-5">
            <div className="flex w-full items-center justify-between px-16">
                <Chip
                    icon={<CurrencyExchangeIcon sx={{ fontSize: 22 }} />}
                    label={`Your total budget: $${totalBudget.toLocaleString()}`}
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

            <div className="flex gap-5 my-5 w-full">
                <BarChart transactions={filteredTransactions} sortPeriod={sortPeriod} />
                <PieChart transactions={filteredTransactions} sortPeriod={sortPeriod} />
            </div>
        </div>
    );
}

export default Dashboard;
