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

        const incomeData = transactions
            .filter((t) => t.type === "income")
            .map((t) => ({
                category: t.category,
                amount: t.amount,
            }))

        setOptions({
            title: { text: t("dashboard.charts.incomeBreakdown"), fontSize: 18, color: "#ffffff" },
            subtitle: { text: t("dashboard.charts.sortedBy", { period: sortPeriod }), fontSize: 14, color: "#b0bec5" },
            data: incomeData,
            series: [
                {
                    type: "pie",
                    angleKey: "amount",
                    labelKey: "category",
                    label: { enabled: true, color: "#ffffff", fontSize: 14 },
                },
            ],
            background: { fill: "#2e2e2e" },
            legend: { position: "bottom", item: { label: { color: "#ffffff" } } },
            height: 400,
        })
    }, [transactions, sortPeriod, t])

    const totalIncome = transactions.reduce((sum, t) => (t.type === "income" ? sum + t.amount : sum), 0)

    return (
        <Box sx={{ width: "100%", maxWidth: "800px" }}>
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

