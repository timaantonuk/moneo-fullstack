import SortDropdown from "../components/SortDropdown.tsx";
import { useState, useMemo } from "react";
import BarChart from "../components/BarChart.tsx";
import PieChart from "../components/PieChart.tsx";
import { Chip, CircularProgress, Typography } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useTransactions } from "../hooks/useTransactions.ts";

function Dashboard() {
    const [sortPeriod, setSortPeriod] = useState<"all" | "month" | "day">("all");

    const { data: transactions, isLoading, error } = useTransactions();

    // 🔥 Вычисляем бюджет: (доход - расходы)
    const totalBudget = useMemo(() => {
        if (!transactions) return 0;

        const income = transactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);

        return income - expenses;
    }, [transactions]);

    const handleSortChange = (period: "all" | "month" | "day") => {
        setSortPeriod(period);
        console.log("Selected period:", period);
    };

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
                        "& .MuiChip-icon": {
                            marginLeft: "-4px",
                        },
                    }}
                />
                <SortDropdown onChange={handleSortChange} />
            </div>

            <div className="flex gap-5 my-5 w-full">
                <BarChart />
                <PieChart />
            </div>
        </div>
    );
}

export default Dashboard;
