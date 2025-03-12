"use client"

import { useState } from "react"
import { BottomNavigation, BottomNavigationAction, Paper, Box } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import { AccountCircle, ShoppingCart } from "@mui/icons-material"
import { Link, useLocation } from "react-router-dom"
import FlagCircleIcon from "@mui/icons-material/FlagCircle"
import { useTranslation } from "react-i18next"

function BottomNavigationBar() {
    const location = useLocation()
    const { t } = useTranslation()

    const getTabValue = (pathname: string) => {
        switch (pathname) {
            case "/income":
                return 1
            case "/expenses":
                return 2
            case "/goals":
                return 3
            case "/account":
                return 4
            default:
                return 0
        }
    }

    const [value, setValue] = useState(getTabValue(location.pathname))

    return (
        <Box sx={{ width: "100%", position: "absolute", bottom: 20 }}>
            <Paper elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={(_, newValue) => setValue(newValue)}
                    showLabels
                    sx={{ width: "100%" }}
                >
                    <BottomNavigationAction label={t("navigation.dashboard")} icon={<DashboardIcon />} component={Link} to="/" />
                    <BottomNavigationAction
                        label={t("navigation.income")}
                        icon={<AttachMoneyIcon />}
                        component={Link}
                        to="/income"
                    />
                    <BottomNavigationAction
                        label={t("navigation.expenses")}
                        icon={<ShoppingCart />}
                        component={Link}
                        to="/expenses"
                    />
                    <BottomNavigationAction
                        label={t("navigation.goals")}
                        icon={<FlagCircleIcon />}
                        component={Link}
                        to="/goals"
                    />
                    <BottomNavigationAction
                        label={t("navigation.account")}
                        icon={<AccountCircle />}
                        component={Link}
                        to="/account"
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    )
}

export default BottomNavigationBar

