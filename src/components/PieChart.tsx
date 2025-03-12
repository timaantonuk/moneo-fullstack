import { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useTransactions } from "../hooks/useTransactions.ts";

export default function PieChart() {
    const { data: transactions, isLoading, error } = useTransactions();
    const [options, setOptions] = useState<AgChartOptions | null>(null);

    console.log(transactions);

    useEffect(() => {
        if (transactions) {
            const incomeData = transactions
                .filter((t: { type: string; }) => t.type === "income")
                .map((t: { category: any; amount: any; }) => ({
                    category: t.category,
                    amount: t.amount,
                }));


            setOptions({
                title: {
                    text: "Income Breakdown",
                    fontSize: 18,
                    color: "#ffffff",
                },
                subtitle: {
                    text: "All amounts in USD",
                    fontSize: 14,
                    color: "#b0bec5",
                },
                data: incomeData,
                series: [
                    {
                        type: "pie",
                        angleKey: "amount",
                        legendItemKey: "category",
                        labelKey: "category",
                        label: {
                            enabled: true,
                            color: "#ffffff",
                            fontSize: 14,
                        },
                    },
                ],
                background: {
                    fill: "#2e2e2e",
                },
                legend: {
                    position: "bottom",
                    item: {
                        label: {
                            color: "#ffffff",
                        },
                    },
                },
                height: 400,
            });
        }
    }, [transactions]);

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load transactions</Typography>;
    if (!options) return null;

    return (
        <Box sx={{ width: "100%", maxWidth: "800px" }}>
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: "#373737",
                    padding: 2,
                    borderRadius: 2,
                    color: "white",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Total Income: ${transactions.reduce((sum: any, t: { type: string; amount: any; }) => t.type === "income" ? sum + t.amount : sum, 0)}
                </Typography>
                <AgCharts options={options} />
            </Paper>
        </Box>
    );
}
