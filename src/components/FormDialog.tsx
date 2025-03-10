import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

type TFormDialogProps = {
    type: 'expense' | 'income',
};

// 20 популярных эмодзи для финансового приложения
const emojiList = [
    "💰", "💳", "🏦", "📈", "📉",
    "💵", "💸", "🪙", "🏧", "🛒",
    "🔖", "🏠", "🛍️", "💲", "💎",
    "💼", "💡", "📝", "🍽️", "🚗"
];

export default function FormDialog({ type }: TFormDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedEmoji, setSelectedEmoji] = React.useState("");

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Add {type === 'expense' ? 'Expense' : 'Income'}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            console.log(formJson);
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle sx={{ backgroundColor: '#212121', color: 'white' }}>
                    Add {type === 'expense' ? 'Expense' : 'Income'}
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#212121' }}>

                    <TextField
                        required
                        margin="dense"
                        id="category"
                        name="category"
                        label="Category"
                        type="text"
                        fullWidth
                        variant='standard'
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                    />

                    <TextField
                        required
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        variant='standard'
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                    />

                    {/* Эмодзи Select */}
                    <FormControl fullWidth margin="dense" variant="standard">
                        <InputLabel sx={{ color: 'white' }}>Pick Emoji</InputLabel>
                        <Select
                            value={selectedEmoji}
                            onChange={(event) => setSelectedEmoji(event.target.value)}
                            displayEmpty
                            sx={{
                                backgroundColor: "#333",
                                color: "white",
                                borderRadius: 1,
                                '& .MuiSelect-icon': { color: 'white' },
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(5, 1fr)", // 5 колонок
                                    gap: 1,
                                    padding: 1,
                                }}
                            >
                                {emojiList.map((emoji) => (
                                    <MenuItem key={emoji} value={emoji} sx={{ fontSize: "1.5rem", justifyContent: "center" }}>
                                        {emoji}
                                    </MenuItem>
                                ))}
                            </Box>
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant='standard'
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                    />

                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#212121' }}>
                    <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' type="submit">
                        Add {type === 'expense' ? 'Expense' : 'Income'}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
