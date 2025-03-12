"use client"

import type React from "react"

import { useState } from "react"
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material"
import { useAddTransaction } from "../hooks/useAddTransaction.ts"
import { useTranslation } from "react-i18next"

type TFormDialogProps = {
    type: "expense" | "income"
}

const emojiList = [
    "💰",
    "💳",
    "🏦",
    "📈",
    "📉",
    "💵",
    "💸",
    "🪙",
    "🏧",
    "🛒",
    "🔖",
    "🏠",
    "🛍️",
    "💲",
    "💎",
    "💼",
    "💡",
    "📝",
    "🍽️",
    "🚗",
]

export default function FormDialog({ type }: TFormDialogProps) {
    const { mutate: addTransaction } = useAddTransaction()
    const { t } = useTranslation()

    const [open, setOpen] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState("")
    const [category, setCategory] = useState("")
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setCategory("")
        setAmount("")
        setDescription("")
        setSelectedEmoji("")
    }

    const handleAddTransaction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!category || !amount || !selectedEmoji) return

        addTransaction({
            type,
            category,
            amount: Number(amount),
            description,
            emoji: selectedEmoji,
        })

        handleClose()
    }

    const translatedType = type === "expense" ? t("expenses.addExpense") : t("income.addIncome")

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                    minWidth: { xs: "100px", sm: "140px" },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    padding: { xs: "4px 8px", sm: "6px 16px" },
                    height: { xs: "32px", sm: "36px" },
                }}
            >
                {translatedType}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: "form",
                        onSubmit: handleAddTransaction,
                    },
                }}
            >
                <DialogTitle sx={{ backgroundColor: "#212121", color: "white" }}>
                    {t("transactions.addTransaction.title", {
                        type: type === "expense" ? t("navigation.expenses") : t("navigation.income"),
                    })}
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: "#212121" }}>
                    <TextField
                        required
                        margin="dense"
                        label={t("transactions.addTransaction.category")}
                        fullWidth
                        variant="standard"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                    />

                    <TextField
                        required
                        margin="dense"
                        label={t("transactions.addTransaction.amount")}
                        type="number"
                        fullWidth
                        variant="standard"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                    />

                    <FormControl fullWidth margin="dense" variant="standard">
                        <InputLabel sx={{ color: "white" }}>{t("transactions.addTransaction.emoji")}</InputLabel>
                        <Select
                            required={true}
                            value={selectedEmoji}
                            onChange={(event) => setSelectedEmoji(event.target.value)}
                            sx={{
                                backgroundColor: "#333",
                                color: "white",
                                borderRadius: 1,
                                "& .MuiSelect-icon": { color: "white" },
                            }}
                        >
                            {emojiList.map((emoji) => (
                                <MenuItem key={emoji} value={emoji} sx={{ fontSize: "1.5rem" }}>
                                    {emoji}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        label={t("transactions.addTransaction.description")}
                        fullWidth
                        variant="standard"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#212121" }}>
                    <Button variant="contained" color="error" onClick={handleClose}>
                        {t("common.cancel")}
                    </Button>
                    <Button variant="contained" type="submit">
                        {t("common.add")} {type === "expense" ? t("navigation.expenses") : t("navigation.income")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

