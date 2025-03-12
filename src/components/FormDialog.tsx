import { useState } from "react";
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
} from "@mui/material";
import { useAddTransaction } from "../hooks/useAddTransaction.ts"; // Подключаем хук

type TFormDialogProps = {
    type: "expense" | "income";
};

const emojiList = [
    "💰", "💳", "🏦", "📈", "📉",
    "💵", "💸", "🪙", "🏧", "🛒",
    "🔖", "🏠", "🛍️", "💲", "💎",
    "💼", "💡", "📝", "🍽️", "🚗"
];

export default function FormDialog({ type }: TFormDialogProps) {
    const { mutate: addTransaction } = useAddTransaction(); // Хук для добавления транзакции

    const [open, setOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setCategory("");
        setAmount("");
        setDescription("");
        setSelectedEmoji("");
    };

    const handleAddTransaction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!category || !amount || !selectedEmoji) return;

        addTransaction({
            type,
            category,
            amount: Number(amount),
            description,
            emoji: selectedEmoji,
        });

        handleClose();
    };

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Add {type === "expense" ? "Expense" : "Income"}
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
                    Add {type === "expense" ? "Expense" : "Income"}
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: "#212121" }}>
                    {/* Категория */}
                    <TextField
                        required
                        margin="dense"
                        label="Category"
                        fullWidth
                        variant="standard"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                    />

                    {/* Сумма */}
                    <TextField
                        required
                        margin="dense"
                        label="Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                    />

                    {/* Эмодзи Select */}
                    <FormControl fullWidth margin="dense" variant="standard">
                        <InputLabel sx={{ color: "white" }}>Pick Emoji</InputLabel>
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

                    {/* Описание */}
                    <TextField
                        margin="dense"
                        label="Description"
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
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                        Add {type === "expense" ? "Expense" : "Income"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
