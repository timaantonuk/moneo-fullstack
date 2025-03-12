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

    const handleToggleCompleted = (goal) => {
        updateGoal({
            id: goal._id,
            isCompleted: !goal.isCompleted,
        })
    }

    if (isLoading) return <CircularProgress />
    if (error) return <Typography color="error">{t("errors.failedToLoad", { item: "goals" })}</Typography>

    return (
        <div className="w-full flex flex-col items-center h-full px-5">
            <div className="flex gap-5 items-center mb-7">
                <Typography variant="h5">{t("goals.title")}</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={() => {
                        setSelectedIcon(iconOptions[0])
                        setOpen(true)
                    }}
                >
                    {t("goals.addGoal")}
                </Button>
            </div>

            <Paper sx={{ width: "100%", maxWidth: 500, padding: 2, backgroundColor: "#212121", color: "white" }}>
                <List>
                    {!goals.length && <p className="text-center">{t("goals.noGoals")}</p>}

                    {goals.map((goal) => (
                        <ListItem
                            key={goal._id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                textDecoration: goal.isCompleted ? "line-through" : "none",
                                opacity: goal.isCompleted ? 0.5 : 1,
                            }}
                        >
                            <ListItemIcon sx={{ color: goal.color }}>
                                <Typography sx={{ fontSize: 24 }}>{goal.emoji}</Typography>
                            </ListItemIcon>
                            <ListItemText
                                primary={goal.title}
                                secondary={t("goals.target", { amount: goal.targetAmount.toLocaleString() })}
                            />
                            <Checkbox
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<CheckCircleIcon />}
                                checked={goal.isCompleted}
                                onChange={() => handleToggleCompleted(goal)}
                            />
                            <IconButton color="error" onClick={() => handleDeleteGoal(goal._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Modal for adding a new goal */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle sx={{ backgroundColor: "#212121", color: "white" }}>{t("goals.addNewGoal")}</DialogTitle>
                <DialogContent sx={{ backgroundColor: "#212121" }}>
                    <TextField
                        label={t("goals.yourGoal")}
                        placeholder={t("goals.yourGoal")}
                        variant="standard"
                        fullWidth
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                        sx={{ marginBottom: 3 }}
                    />

                    <TextField
                        label={t("goals.targetAmount")}
                        type="number"
                        variant="standard"
                        fullWidth
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(Math.max(1, Number(e.target.value)))}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                        sx={{ marginBottom: 3 }}
                    />

                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel sx={{ color: "white" }}>{t("goals.selectIcon")}</InputLabel>
                        <Select
                            className="mt-2"
                            value={selectedIcon.name}
                            onChange={(e) => {
                                const selected = iconOptions.find((option) => option.name === e.target.value)
                                if (selected) setSelectedIcon(selected)
                            }}
                            sx={{ backgroundColor: "#333", color: "white", borderRadius: 1 }}
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

