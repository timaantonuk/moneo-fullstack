import { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { Box, Paper, Typography } from "@mui/material";

export default function PieChart({ transactions, sortPeriod }) {
    const [options, setOptions] = useState<AgChartOptions | null>(null);

    useEffect(() => {
        if (!transactions || transactions.length === 0) {
            setOptions(null);
            return;
        }

        const incomeData = transactions
            .filter((t) => t.type === "income")
            .map((t) => ({
                category: t.category,
                amount: t.amount,
            }));

        setOptions({
            title: { text: "Income Breakdown", fontSize: 18, color: "#ffffff" },
            subtitle: { text: `Sorted by: ${sortPeriod}`, fontSize: 14, color: "#b0bec5" },
            data: incomeData,
            series: [{ type: "pie", angleKey: "amount", labelKey: "category", label: { enabled: true, color: "#ffffff", fontSize: 14 } }],
            background: { fill: "#2e2e2e" },
            legend: { position: "bottom", item: { label: { color: "#ffffff" } } },
            height: 400,
        });
    }, [transactions, sortPeriod]);

    return (
        <Box sx={{ width: "100%", maxWidth: "800px" }}>
            <Paper elevation={3} sx={{ backgroundColor: "#373737", padding: 2, borderRadius: 2, color: "white" }}>
                <Typography variant="h6" gutterBottom>
                    Total Income: ${transactions.reduce((sum, t) => (t.type === "income" ? sum + t.amount : sum), 0)}
                </Typography>
                {options ? <AgCharts options={options} /> : <Typography>No transactions for {sortPeriod}.</Typography>}
            </Paper>
        </Box>
    );
}
