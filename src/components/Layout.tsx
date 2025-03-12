"use client"

import type React from "react"

import { Avatar, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material"
import { Outlet } from "react-router-dom"
import LogoutButton from "./LogoutButton"
import LanguageSelector from "./LanguageSelector"
import BottomNavigationBar from "./BottomNavigationBar"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import type { RootState } from "../store/store"
import { useState } from "react"
import { MoreVert } from "@mui/icons-material"

function Layout() {
    const auth = useSelector((state: RootState) => state.auth)
    const userName = auth.user?.fullName || "Guest"
    const { t } = useTranslation()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <section className="flex justify-center items-center lg:h-screen h-auto w-screen">
            <div className="main-wrapper flex flex-col items-center py-5 relative max-w-4xl">
                <div className="hidden lg:flex gap-2 items-center justify-between w-full px-10 mb-5">
                    <LogoutButton />
                    <div className="flex gap-2 items-center">
                        <Avatar alt="Your Avatar" sx={{ width: 64, height: 64 }} src={auth.user?.avatar || ""} />
                        <Typography
                            sx={{
                                fontSize: { xs: "1.2rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
                            }}
                            variant="h4"
                        >
                            {t("common.welcome", { name: userName })}
                        </Typography>
                    </div>
                    <LanguageSelector />
                </div>

                <div className="lg:hidden flex flex-col gap-2 items-center justify-between w-full px-5 mb-5">
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <Avatar alt="Your Avatar" sx={{ width: 48, height: 48 }} src={auth.user?.avatar || ""} />
                        <Typography
                            sx={{
                                fontSize: { xs: "1rem", sm: "1.5rem" },
                                maxWidth: "60%",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}
                            variant="h5"
                        >
                            {t("common.welcome", { name: userName })}
                        </Typography>
                        <IconButton onClick={handleMenuOpen}>
                            <MoreVert />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                sx: {
                                    padding: "4px",
                                    minWidth: "150px",
                                },
                            }}
                        >
                            <MenuItem sx={{ justifyContent: "center" }}>
                                <LogoutButton />
                            </MenuItem>
                            <MenuItem sx={{ justifyContent: "center" }}>
                                <LanguageSelector />
                            </MenuItem>
                        </Menu>
                    </Box>
                </div>

                <div className="w-full flex-1">
                    <Outlet />
                </div>

                <BottomNavigationBar />
            </div>
        </section>
    )
}

export default Layout

