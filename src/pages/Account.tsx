"use client"

import { useState } from "react"
import {
    Avatar,
    Button,
    Paper,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
    CircularProgress,
} from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"
import EditIcon from "@mui/icons-material/Edit"
import { useSelector, useDispatch } from "react-redux"
import { useUpdateProfile } from "../hooks/useUpdateProfile.ts"
import { setUser } from "../store/slices/authSlice.ts"
import { useTranslation } from "react-i18next"
import type { RootState } from "../store/store.ts"

function Account() {
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.auth)
    const { mutate: updateProfile, isLoading } = useUpdateProfile()
    const { t, i18n } = useTranslation()

    const user = auth.user

    const [avatarUrl, setAvatarUrl] = useState(
        user?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random().toString(36).substring(7)}`,
    )
    const [name, setName] = useState(user?.fullName || "User")
    const [language, setLanguage] = useState(user?.language || "en")

    const [openNameDialog, setOpenNameDialog] = useState(false)
    const [openLanguageDialog, setOpenLanguageDialog] = useState(false)
    const [tempName, setTempName] = useState(name)
    const [tempLanguage, setTempLanguage] = useState(language)

    const reGenerateAvatar = () => {
        const newSeed = Math.random().toString(36).substring(7)
        const newAvatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${newSeed}`

        setAvatarUrl(newAvatarUrl)
        updateProfile({ avatar: newAvatarUrl })
        if (user) {
            dispatch(setUser({ user: { ...user, avatar: newAvatarUrl }, token: auth.token || "" }))
        }
    }

    const handleSaveName = () => {
        setName(tempName)
        updateProfile({ fullName: tempName })
        if (user) {
            dispatch(setUser({ user: { ...user, fullName: tempName }, token: auth.token || "" }))
        }
        setOpenNameDialog(false)
    }

    const handleSaveLanguage = () => {
        setLanguage(tempLanguage)
        updateProfile({ language: tempLanguage })
        if (user) {
            dispatch(setUser({ user: { ...user, language: tempLanguage }, token: auth.token || "" }))
        }
        i18n.changeLanguage(tempLanguage)
        setOpenLanguageDialog(false)
    }

    if (isLoading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px", width: "100%" }}>
                <CircularProgress />
            </Box>
        )

    return (
        <div className="w-full flex flex-col items-center h-full px-5">
            <Paper sx={{ width: "100%", maxWidth: 500, padding: 3, backgroundColor: "#212121", color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                    >
                        {t("account.yourAvatar")}
                    </Typography>
                    <div className="flex items-center gap-5">
                        <Avatar src={avatarUrl} sx={{ width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 } }} />
                        <Button
                            variant="contained"
                            startIcon={<RefreshIcon />}
                            onClick={reGenerateAvatar}
                            sx={{
                                minWidth: { xs: 80, sm: 120 },
                                fontSize: { xs: "0.75rem", sm: "1rem" },
                                padding: { xs: "4px 8px", sm: "6px 16px" },
                            }}
                        >
                            {t("account.regenerate")}
                        </Button>
                    </div>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                    >
                        {t("account.yourName")}
                    </Typography>
                    <div className="flex items-center gap-5">
                        <Typography variant="body1">{name}</Typography>
                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => setOpenNameDialog(true)}
                            sx={{
                                minWidth: { xs: 80, sm: 120 },
                                fontSize: { xs: "0.75rem", sm: "1rem" },
                                padding: { xs: "4px 8px", sm: "6px 16px" },
                            }}
                        >
                            {t("common.edit")}
                        </Button>
                    </div>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                    >
                        {t("account.language")}
                    </Typography>
                    <div className="flex items-center gap-5">
                        <Typography variant="body1">{t(`account.languages.${language}`)}</Typography>
                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => setOpenLanguageDialog(true)}
                            sx={{
                                minWidth: { xs: 80, sm: 120 },
                                fontSize: { xs: "0.75rem", sm: "1rem" },
                                padding: { xs: "4px 8px", sm: "6px 16px" },
                            }}
                        >
                            {t("common.edit")}
                        </Button>
                    </div>
                </Box>
            </Paper>

            <Dialog open={openNameDialog} onClose={() => setOpenNameDialog(false)}>
                <DialogTitle sx={{ backgroundColor: "#212121", color: "white" }}>{t("account.editName")}</DialogTitle>
                <DialogContent sx={{ backgroundColor: "#212121" }}>
                    <TextField
                        fullWidth
                        variant="standard"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#212121" }}>
                    <Button color="error" onClick={() => setOpenNameDialog(false)}>
                        {t("common.cancel")}
                    </Button>
                    <Button variant="contained" onClick={handleSaveName}>
                        {t("common.save")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Account

