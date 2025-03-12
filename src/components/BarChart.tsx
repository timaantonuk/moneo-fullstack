"use client"

import { useEffect, useState } from "react"
import { AgCharts } from "ag-charts-react"
import type { AgChartOptions } from "ag-charts-community"
import { Box, Paper, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

export default function BarChart({ transactions, sortPeriod }) {
    const [options, setOptions] = useState<AgChartOptions | null>(null)
    const { t } = useTranslation()

    useEffect(() => {
        if (!transactions || transactions.length === 0) {
            setOptions(null)
            return
        }

        const expenseTransactions = transactions.filter((t) => t.type === "expense")

        if (expenseTransactions.length === 0) {
            setOptions(null)
            return
        }

        const groupedData = {}
        expenseTransactions.forEach((t) => {
            const month = new Date(t.date).toLocaleString("en-US", { month: "long" })

            if (!groupedData[month]) {
                groupedData[month] = { period: month }
            }

            if (!groupedData[month][t.category]) {
                groupedData[month][t.category] = 0
            }

            groupedData[month][t.category] += t.amount
        })

        const chartData = Object.values(groupedData)

        if (chartData.length === 0 || !chartData[0]) {
            setOptions(null)
            return
        }

        setOptions({
            title: { text: t("dashboard.charts.expensesBreakdown"), fontSize: 18, color: "#ffffff" },
            subtitle: { text: t("dashboard.charts.sortedBy", { period: sortPeriod }), fontSize: 14, color: "#b0bec5" },
            data: chartData,
            series: Object.keys(chartData[0] || {})
                .filter((key) => key !== "period")
                .map((category) => ({
                    type: "bar",
                    xKey: "period",
                    yKey: category,
                    yName: category,
                    stacked: true,
                })),
            axes: [
                { type: "category", position: "bottom", label: { color: "#ffffff", fontSize: 12 } },
                {
                    type: "number",
                    position: "left",
                    label: { color: "#ffffff", fontSize: 12 },
                    gridStyle: [{ stroke: "#455a64", lineDash: [4, 2] }],
                },
            ],
            background: { fill: "#2e2e2e" },
            legend: { position: "bottom", item: { label: { color: "#ffffff" } } },
            height: 400,
        })
    }, [transactions, sortPeriod, t])

    const totalExpenses = transactions.reduce((sum, t) => (t.type === "expense" ? sum + t.amount : sum), 0)

    return (
        <Box sx={{ width: "100%", maxWidth: "800px", mb: { xs: 6, md: 2 } }}>
            <Paper elevation={3} sx={{ backgroundColor: "#373737", padding: 2, borderRadius: 2, color: "white" }}>
                <Typography variant="h6" gutterBottom>
                    {t("dashboard.charts.totalExpenses", { amount: totalExpenses })}
                </Typography>
                {options ? (
                    <AgCharts options={options} />
                ) : (
                    <Typography>{t("dashboard.charts.noTransactions", { period: sortPeriod })}</Typography>
                )}
            </Paper>
        </Box>
    )
}

