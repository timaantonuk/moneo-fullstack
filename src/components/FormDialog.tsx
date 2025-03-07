import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type TFormDialogProps = {
    type: 'expense' | 'income',
}

export default function FormDialog({type}: TFormDialogProps) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle sx={{backgroundColor: '#212121'}}>Add {type === 'expense' ? 'Expense' : 'Income'}</DialogTitle>
                <DialogContent sx={{backgroundColor: '#212121'}}>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="category"
                        name="category"
                        label="Category"
                        type="text"
                        fullWidth
                        variant='standard'
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        variant='standard'
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant='standard'
                    />
                </DialogContent>
                <DialogActions sx={{backgroundColor: '#212121'}}>
                    <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' type="submit">Add {type === 'expense' ? 'Expense' : 'Income'}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
