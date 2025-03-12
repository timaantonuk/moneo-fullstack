import { Avatar, Typography } from "@mui/material"
import { Outlet } from "react-router-dom"
import LogoutButton from "./LogoutButton"
import LanguageSelector from "./LanguageSelector"
import BottomNavigationBar from "./BottomNavigationBar"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import type { RootState } from "../store/store"

function Layout() {
    const auth = useSelector((state: RootState) => state.auth)
    const userName = auth.user?.fullName || "Guest"
    const { t } = useTranslation()

    return (
        <section className="flex justify-center items-center h-screen w-screen">
            <div className="main-wrapper flex flex-col items-center py-5 relative max-w-4xl">
                <div className="flex gap-2 items-center justify-between w-full px-10 mb-5">
                    <LogoutButton />
                    <div className="flex gap-2 items-center">
                        <Avatar alt="Your Avatar" sx={{ width: 64, height: 64 }} src={auth.user?.avatar || ""} />
                        <Typography variant="h4">{t("common.welcome", { name: userName })}</Typography>
                    </div>
                    <LanguageSelector />
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

