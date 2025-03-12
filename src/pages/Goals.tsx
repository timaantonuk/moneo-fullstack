"use client"

import { useState } from "react"
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Paper,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    CircularProgress,
    Box,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import DeleteIcon from "@mui/icons-material/Delete"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import SavingsIcon from "@mui/icons-material/Savings"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import FastfoodIcon from "@mui/icons-material/Fastfood"
import TravelExploreIcon from "@mui/icons-material/TravelExplore"
import { useGoals } from "../hooks/useGoals.ts"
import { useAddGoal } from "../hooks/useAddGoal.ts"
import { useDeleteGoal } from "../hooks/useDeleteGoal.ts"
import { useUpdateGoal } from "../hooks/useUpdateGoal.ts"
import { useTranslation } from "react-i18next"

const iconOptions = [
    { name: "Savings", emoji: "💰", color: "#1ABC9C", icon: <SavingsIcon /> },
    { name: "Gym", emoji: "🏋️", color: "#E74C3C", icon: <FitnessCenterIcon /> },
    { name: "HealthyEating", emoji: "🥗", color: "#2ECC71", icon: <FastfoodIcon /> },
    { name: "Travel", emoji: "✈️", color: "#3498DB", icon: <TravelExploreIcon /> },
    { name: "Finance", emoji: "📈", color: "#F1C40F", icon: <TrendingUpIcon /> },
]

export default function Goals() {
    const { data: goals, isLoading, error } = useGoals()
    const { mutate: addGoal } = useAddGoal()
    const { mutate: deleteGoal } = useDeleteGoal()
    const { mutate: updateGoal } = useUpdateGoal()
    const { t } = useTranslation()

    const [open, setOpen] = useState(false)
    const [newGoal, setNewGoal] = useState("")
    const [targetAmount, setTargetAmount] = useState(100)
    const [selectedIcon, setSelectedIcon] = useState(iconOptions[0])

    const handleAddGoal = () => {
        if (!newGoal.trim()) return
        addGoal({
            title: newGoal,
            emoji: selectedIcon.emoji,
            color: selectedIcon.color,
            targetAmount,
            isCompleted: false,
        })

        setOpen(false)
        setNewGoal("")
        setTargetAmount(100)
        setSelectedIcon(iconOptions[0])
    }

    const handleDeleteGoal = (id: string) => {
        deleteGoal(id)
    }

    const handleToggleCompleted = (goal: any) => {
        updateGoal({
            id: goal._id,
            isCompleted: !goal.isCompleted,
        })
    }

    if (isLoading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px", width: "100%" }}>
                <CircularProgress />
            </Box>
        )

    if (error) return <Typography color="error">{t("errors.failedToLoad", { item: "goals" })}</Typography>

    return (
        <div className="w-full flex flex-col items-center h-full px-5">
            <div className="flex gap-5 items-center mb-7">
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    }}
                >
                    {t("goals.title")}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={() => {
                        setSelectedIcon(iconOptions[0])
                        setOpen(true)
                    }}
                    sx={{
                        minWidth: { xs: 80, sm: 120 },
                        fontSize: { xs: "0.75rem", sm: "1rem" },
                        padding: { xs: "4px 8px", sm: "6px 16px" },
                    }}
                >
                    {t("goals.addGoal")}
                </Button>
            </div>

            <Paper sx={{ width: "100%", maxWidth: 500, padding: 2, backgroundColor: "#212121", color: "white" }}>
                <List>
                    {!goals || (goals.length === 0 && <p className="text-center">{t("goals.noGoals")}</p>)}

                    {goals &&
                        goals.map((goal: any) => (
                            <ListItem
                                key={goal._id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: { xs: 1, sm: 2 },
                                    textDecoration: goal.isCompleted ? "line-through" : "none",
                                    opacity: goal.isCompleted ? 0.5 : 1,
                                    paddingY: { xs: 0.5, sm: 1 },
                                }}
                            >
                                <ListItemIcon sx={{ color: goal.color }}>
                                    <Typography sx={{ fontSize: { xs: 20, sm: 24 } }}>{goal.emoji}</Typography>
                                </ListItemIcon>
                                <ListItemText
                                    primary={goal.title}
                                    secondary={t("goals.target", { amount: goal.targetAmount.toLocaleString() })}
                                    sx={{
                                        fontSize: { xs: "0.875rem", sm: "1rem" },
                                    }}
                                />
                                <Checkbox
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<CheckCircleIcon />}
                                    checked={goal.isCompleted}
                                    onChange={() => handleToggleCompleted(goal)}
                                    sx={{
                                        transform: { xs: "scale(0.8)", sm: "scale(1)" },
                                    }}
                                />
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteGoal(goal._id)}
                                    sx={{
                                        transform: { xs: "scale(0.8)", sm: "scale(1)" },
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                </List>
            </Paper>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle sx={{ backgroundColor: "#212121", color: "white" }}>{t("goals.addNewGoal")}</DialogTitle>
                <DialogContent sx={{ backgroundColor: "#212121" }}>
                    <TextField
                        label={t("goals.yourGoal")}
                        variant="standard"
                        fullWidth
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        sx={{ marginBottom: 3 }}
                    />

                    <TextField
                        label={t("goals.targetAmount")}
                        type="number"
                        variant="standard"
                        fullWidth
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(Math.max(1, Number(e.target.value)))}
                        sx={{ marginBottom: 3 }}
                    />

                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>{t("goals.selectIcon")}</InputLabel>
                        <Select
                            value={selectedIcon.name}
                            onChange={(e) => {
                                const selected = iconOptions.find((option) => option.name === e.target.value)
                                if (selected) setSelectedIcon(selected)
                            }}
                        >
                            {iconOptions.map((option, index) => (
                                <MenuItem key={index} value={option.name}>
                                    {option.emoji} {t(`goals.icons.${option.name}`)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#212121" }}>
                    <Button color="error" onClick={() => setOpen(false)}>
                        {t("common.cancel")}
                    </Button>
                    <Button variant="contained" onClick={handleAddGoal}>
                        {t("goals.addGoal")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

