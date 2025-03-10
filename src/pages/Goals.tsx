import { useState } from "react";
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
    Typography
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const iconOptions = [
    { name: "Savings", icon: <SavingsIcon /> },
    { name: "Gym", icon: <FitnessCenterIcon /> },
    { name: "Healthy Eating", icon: <FastfoodIcon /> },
    { name: "Travel", icon: <TravelExploreIcon /> },
    { name: "Finance", icon: <TrendingUpIcon /> },
];

export default function Goals() {
    const [goals, setGoals] = useState([
        { id: 1, text: "Increase savings", icon: <SavingsIcon /> },
        { id: 2, text: "Hit the gym 3x per week", icon: <FitnessCenterIcon /> },
        { id: 3, text: "Eat healthy meals", icon: <FastfoodIcon /> },
        { id: 4, text: "Travel to a new country", icon: <TravelExploreIcon /> },
        { id: 5, text: "Improve financial literacy", icon: <TrendingUpIcon /> },
    ]);

    const [completedGoals, setCompletedGoals] = useState<number[]>([]);
    const [open, setOpen] = useState(false);
    const [newGoal, setNewGoal] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(iconOptions[0].icon);

    const toggleGoal = (id: number) => {
        setCompletedGoals((prev) =>
            prev.includes(id) ? prev.filter(goalId => goalId !== id) : [...prev, id]
        );
    };

    const deleteGoal = (id: number) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    const handleAddGoal = () => {
        if (newGoal.trim() !== "") {
            setGoals([...goals, { id: Date.now(), text: newGoal, icon: selectedIcon }]);
            setNewGoal("");
            setOpen(false);
        }
    };

    return (
        <div className='w-full flex flex-col items-center h-full px-5'>

            <div className='flex gap-5 items-center mb-7'>
                <Typography variant='h5'>Your goals list:</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={() => setOpen(true)}
                >
                    Add Goal
                </Button>
            </div>

            <Paper sx={{ width: "100%", maxWidth: 500, padding: 2, backgroundColor: "#212121", color: "white" }}>
                <List>
                    {goals.map((goal) => (
                        <ListItem
                            key={goal.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                textDecoration: completedGoals.includes(goal.id) ? "line-through" : "none",
                                opacity: completedGoals.includes(goal.id) ? 0.5 : 1
                            }}
                        >
                            <ListItemIcon sx={{ color: "white" }}>
                                {goal.icon}
                            </ListItemIcon>
                            <ListItemText primary={goal.text} />
                            <Checkbox
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<CheckCircleIcon />}
                                checked={completedGoals.includes(goal.id)}
                                onChange={() => toggleGoal(goal.id)}
                            />
                            <IconButton color="error" onClick={() => deleteGoal(goal.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Модалка для добавления новой цели */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle sx={{ backgroundColor: "#212121", color: "white" }}>Add a New Goal</DialogTitle>
                <DialogContent sx={{ backgroundColor: "#212121" }}>
                    <TextField
                        label="Goal"
                        variant="standard"
                        fullWidth
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                    />
                    <FormControl fullWidth sx={{ marginTop: 2 }}>
                        <InputLabel sx={{ color: "white" }}>Select Icon</InputLabel>
                        <Select
                            value={selectedIcon}
                            onChange={(e) => setSelectedIcon(e.target.value)}
                            sx={{ backgroundColor: "#333", color: "white", borderRadius: 1 }}
                        >
                            {iconOptions.map((option, index) => (
                                <MenuItem key={index} value={option.icon} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    {option.icon} {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#212121" }}>
                    <Button color="error" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddGoal}>Add Goal</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
