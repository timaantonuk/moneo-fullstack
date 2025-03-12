"use client"

import { useEffect, useState } from "react"
import { AgCharts } from "ag-charts-react"
import type { AgChartOptions } from "ag-charts-community"
import { Box, Paper, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

export default function PieChart({ transactions, sortPeriod }) {
    const [options, setOptions] = useState<AgChartOptions | null>(null)
    const { t } = useTranslation()

    useEffect(() => {
        if (!transactions || transactions.length === 0) {
            setOptions(null)
            return
        }

        // Group income transactions by category and sum amounts
        const incomeData = []
        const incomeByCategory = {}

        transactions
            .filter((t) => t.type === "income")
            .forEach((t) => {
                if (!incomeByCategory[t.category]) {
                    incomeByCategory[t.category] = 0
                }
                incomeByCategory[t.category] += t.amount
            })

        // Convert to array format for chart
        Object.keys(incomeByCategory).forEach((category) => {
            incomeData.push({
                category,
                amount: incomeByCategory[category],
            })
        })

        if (incomeData.length === 0) {
            setOptions(null)
            return
        }

        setOptions({
            title: { text: t("dashboard.charts.incomeBreakdown"), fontSize: 18, color: "#ffffff" },
            subtitle: { text: t("dashboard.charts.sortedBy", { period: sortPeriod }), fontSize: 14, color: "#b0bec5" },
            data: incomeData,
            series: [
                {
                    type: "pie",
                    angleKey: "amount",
                    labelKey: "category",
                    calloutLabelKey: "category",
                    sectorLabelKey: "amount",
                    sectorLabel: {
                        formatter: (params) => `$${params.datum.amount}`,
                        color: "#ffffff",
                    },
                    calloutLabel: {
                        enabled: true,
                        color: "#ffffff",
                        fontSize: 14,
                    },
                    tooltip: {
                        renderer: (params) => {
                            return {
                                title: params.datum.category,
                                content: `$${params.datum.amount.toLocaleString()}`,
                            }
                        },
                    },
                },
            ],
            background: { fill: "#2e2e2e" },
            legend: { position: "bottom", item: { label: { color: "#ffffff" } } },
            height: 400,
        })
    }, [transactions, sortPeriod, t])

    const totalIncome = transactions.reduce((sum, t) => (t.type === "income" ? sum + t.amount : sum), 0)

    return (
        <Box sx={{ width: "100%", maxWidth: "800px", mb: { xs: 6, md: 2 } }}>
            <Paper elevation={3} sx={{ backgroundColor: "#373737", padding: 2, borderRadius: 2, color: "white" }}>
                <Typography variant="h6" gutterBottom>
                    {t("dashboard.charts.totalIncome", { amount: totalIncome })}
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

