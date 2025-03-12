"use client"

import type React from "react"
import { useState } from "react"
import { Menu, MenuItem, Button, ListItemIcon, ListItemText, Box } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store/store.ts"
import { setUser } from "../store/slices/authSlice.ts"
import { useUpdateProfile } from "../hooks/useUpdateProfile.ts"
import { useTranslation } from "react-i18next"

type Language = "en" | "ru" | "de"

const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
]

function LanguageSelector() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const dispatch = useDispatch()
    const { mutate: updateProfile } = useUpdateProfile()
    const { t, i18n } = useTranslation()

    // Get current language from Redux (authSlice)
    const user = useSelector((state: RootState) => state.auth.user)
    const selectedLanguage: Language = user?.language || "en"
    const auth = useSelector((state: RootState) => state.auth)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSelectLanguage = (lang: Language) => {
        if (lang !== selectedLanguage) {
            // First change the i18n language immediately for better UX
            i18n.changeLanguage(lang)

            // Then update the backend and Redux
            updateProfile(
                { language: lang },
                {
                    onSuccess: () => {
                        // This will only run if the API call succeeds
                        console.log("Language updated successfully")
                    },
                    onError: (error) => {
                        console.error("Failed to update language on server:", error)
                        // Optionally revert the i18n language if the API call fails
                        // i18n.changeLanguage(selectedLanguage);
                    },
                },
            )

            // Update Redux immediately for better UX
            dispatch(setUser({ user: { ...user, language: lang }, token: auth.token }))

            handleClose()
        }
    }

    const currentLanguage = languages.find((lang) => lang.code === selectedLanguage)

    return (
        <div>
            <Button variant="contained" onClick={handleClick} sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <span style={{ fontSize: "18px" }}>{currentLanguage?.flag}</span>
                    <span>{currentLanguage?.label}</span>
                </Box>
            </Button>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {languages.map((language) => (
                    <MenuItem key={language.code} onClick={() => handleSelectLanguage(language.code as Language)}>
                        <ListItemIcon sx={{ minWidth: "30px", display: "flex", alignItems: "center" }}>
                            <span style={{ fontSize: "20px" }}>{language.flag}</span>
                        </ListItemIcon>
                        <ListItemText primary={language.label} />
                        {selectedLanguage === language.code && (
                            <ListItemIcon sx={{ minWidth: "30px", display: "flex", alignItems: "center" }}>
                                <CheckIcon fontSize="small" />
                            </ListItemIcon>
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default LanguageSelector

