"use client"

import { useEffect, useState } from "react"
import { AgCharts } from "ag-charts-react"
import type { AgChartOptions } from "ag-charts-community"
import { Box, Paper, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { format, parseISO, startOfMonth } from "date-fns"

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

        // Create a map to store grouped data by month
        const groupedData: Record<string, any> = {}

        expenseTransactions.forEach((t) => {
            // Ensure date is properly parsed in UTC
            const transactionDate = parseISO(t.date)
            const monthKey = format(startOfMonth(transactionDate), "yyyy-MM") // Ex: "2025-01"

            if (!groupedData[monthKey]) {
                groupedData[monthKey] = { period: format(transactionDate, "MMMM yyyy") } // Ex: "January 2025"
            }

            if (!groupedData[monthKey][t.category]) {
                groupedData[monthKey][t.category] = 0
            }

            groupedData[monthKey][t.category] += t.amount
        })

        // Convert to array and sort chronologically
        const chartData = Object.values(groupedData).sort((a: any, b: any) =>
            parseISO(a.period) > parseISO(b.period) ? 1 : -1
        )

        if (chartData.length === 0 || !chartData[0]) {
            setOptions(null)
            return
        }

        // Get all unique categories across all months
        const allCategories = new Set<string>()
        chartData.forEach((monthData: any) => {
            Object.keys(monthData).forEach((key) => {
                if (key !== "period") {
                    allCategories.add(key)
                }
            })
        })

        setOptions({
            title: { text: t("dashboard.charts.expensesBreakdown"), fontSize: 18, color: "#ffffff" },
            subtitle: { text: t("dashboard.charts.sortedBy", { period: sortPeriod }), fontSize: 14, color: "#b0bec5" },
            data: chartData,
            series: Array.from(allCategories).map((category) => ({
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
                    label: { color: "#ffffff", fontSize: 12 },
                    title: { text: "Month", color: "#ffffff" },
                },
                {
                    type: "number",
                    position: "left",
                    label: { color: "#ffffff", fontSize: 12 },
                    gridStyle: [{ stroke: "#455a64", lineDash: [4, 2] }],
                    title: { text: "Amount ($)", color: "#ffffff" },
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
