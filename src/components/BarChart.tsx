import { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import { useTransactions } from "../hooks/useTransactions.ts";

export default function BarChart() {
    const { data: transactions, isLoading, error } = useTransactions();
    const [options, setOptions] = useState<AgChartOptions | null>(null);

    useEffect(() => {
        if (transactions) {
            const expenseTransactions = transactions.filter(t => t.type === "expense");


            const groupedData: Record<string, any> = {};
            expenseTransactions.forEach(t => {
                const month = new Date(t.date).toLocaleString("en-US", { month: "long" });

                if (!groupedData[month]) {
                    groupedData[month] = { period: month };
                }

                if (!groupedData[month][t.category]) {
                    groupedData[month][t.category] = 0;
                }

                groupedData[month][t.category] += t.amount;
            });

            const chartData = Object.values(groupedData);

            setOptions({
                title: {
                    text: "Monthly Expenses Breakdown",
                    fontSize: 18,
                    color: "#ffffff",
                },
                subtitle: {
                    text: "All amounts in USD",
                    fontSize: 14,
                    color: "#b0bec5",
                },
                data: chartData,
                series: Object.keys(chartData[0] || {}).filter(key => key !== "period").map(category => ({
                    type: "bar",
                    xKey: "period",
                    yKey: category,
                    yName: category,
                    stacked: true,
                })),
                axes: [
                    {
                        type: "category",
                        position: "bottom",
                        label: {
                            color: "#ffffff",
                            fontSize: 12,
                        },
                    },
                    {
                        type: "number",
                        position: "left",
                        label: {
                            color: "#ffffff",
                            fontSize: 12,
                        },
                        gridStyle: [{ stroke: "#455a64", lineDash: [4, 2] }],
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
                    Total Expenses: ${transactions.reduce((sum, t) => t.type === "expense" ? sum + t.amount : sum, 0)}
                </Typography>
                <AgCharts options={options} />
            </Paper>
        </Box>
    );
}
