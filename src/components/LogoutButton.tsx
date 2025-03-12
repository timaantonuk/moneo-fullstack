"use client"

import { Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { logout } from "../store/slices/authSlice.ts"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

function LogoutButton() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem("user")
        navigate("/login")
    }

    return (
        <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{
                minWidth: { xs: "100px", sm: "120px" },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                padding: { xs: "4px 8px", sm: "6px 16px" },
                height: { xs: "32px", sm: "36px" },
            }}
        >
            {t("common.logout")}
        </Button>
    )
}

export default LogoutButton

