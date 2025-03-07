import { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { Box, Paper, Typography } from "@mui/material";

function getData() {
    return [
        { period: "January", food: 500, rent: 1000, transport: 200, entertainment: 150, healthcare: 100 },
        { period: "February", food: 450, rent: 1000, transport: 180, entertainment: 200, healthcare: 120 },
        { period: "March", food: 480, rent: 1000, transport: 220, entertainment: 170, healthcare: 130 },
        { period: "April", food: 510, rent: 1000, transport: 210, entertainment: 160, healthcare: 110 },
        { period: "May", food: 520, rent: 1000, transport: 230, entertainment: 180, healthcare: 105 },
    ];
}

export default function BarChart() {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Monthly Expenses Breakdown",
            fontSize: 18,
            color: '#ff' +
                'ffff', // Под темную тему MUI
        },

        subtitle: {
            text: "All amounts in USD",
            fontSize: 14,
            color: '#b0bec5',
        },
        data: getData(),
        series: [
            {
                type: "bar",
                xKey: "period",
                yKey: "food",
                yName: "Food",
                stacked: true,
            },
            {
                type: "bar",
                xKey: "period",
                yKey: "rent",
                yName: "Rent",
                stacked: true,
            },
            {
                type: "bar",
                xKey: "period",
                yKey: "transport",
                yName: "Transport",
                stacked: true,
            },
            {
                type: "bar",
                xKey: "period",
                yKey: "entertainment",
                yName: "Entertainment",
                stacked: true,
            },
            {
                type: "bar",
                xKey: "period",
                yKey: "healthcare",
                yName: "Healthcare",
                stacked: true,
            },
        ],
        axes: [
            {
                type: 'category',
                position: 'bottom',
                label: {
                    color: '#ffffff', // Белый текст для оси, если темная тема
                    fontSize: 12,
                },
            },
            {
                type: 'number',
                position: 'left',
                label: {
                    color: '#ffffff',
                    fontSize: 12,
                },
                gridStyle: [
                    { stroke: '#455a64', lineDash: [4, 2] }
                ]
            }
        ],
        background: {
            fill: '#2e2e2e',
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
        <Box sx={{ width: '100%', maxWidth: '800px'}}>
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
                    Total Expenses: 2500 $
                </Typography>

                    <AgCharts options={options}/>

            </Paper>


        </Box>
    );
}
