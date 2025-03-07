import { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { Box, Paper, Typography } from "@mui/material";

function getIncomeData() {
    return [
        { category: "Salary", amount: 4000 },
        { category: "Savings", amount: 1000 },
    ];
}

export default function PieChart() {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Income Breakdown",
            fontSize: 18,
            color: '#ffffff', // Под темную тему
        },
        subtitle: {
            text: "All amounts in USD",
            fontSize: 14,
            color: '#b0bec5',
        },
        data: getIncomeData(),
        series: [
            {
                type: 'pie',
                angleKey: 'amount',
                legendItemKey: 'category',
                labelKey: 'category',
                label: {
                    enabled: true,
                    color: '#ffffff',
                    fontSize: 14,
                },
            }
        ],
        background: {
            fill: '#2e2e2e', // Темный фон
        },
        legend: {
            position: 'bottom',
            item: {
                label: {
                    color: '#ffffff',
                },
            },
        },
        height: 400
    });

    return (
        <Box sx={{ width: '100%', maxWidth: '800px' }}>
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: '#373737',
                    padding: 2,
                    borderRadius: 2,
                    color: 'white',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Total Income: 3000 $
                </Typography>
                <AgCharts options={options} />
            </Paper>
        </Box>
    );
}
