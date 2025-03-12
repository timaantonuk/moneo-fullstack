import { useState } from "react";
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions.ts";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction.ts";
import { useUpdateTransaction } from "../hooks/useUpdateTransaction.ts";
import {
    Button,
    Chip,
    CircularProgress,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import { Delete, EditNote } from "@mui/icons-material";
import { dateComparator } from "../utils/functions.ts";

ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withParams({
    backgroundColor: "#373737",
    browserColorScheme: "dark",
    chromeBackgroundColor: {
        ref: "foregroundColor",
        mix: 0.07,
        onto: "backgroundColor"
    },
    fontFamily: "inherit",
    foregroundColor: "#FFF",
    headerFontSize: 14
});

export default function ExpenseAndIncomeTable({ type }: { type: "income" | "expense" }) {
    const { data: transactions, isLoading, error } = useTransactions();
    const { mutate: deleteTransaction } = useDeleteTransaction();
    const { mutate: updateTransaction } = useUpdateTransaction();

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [updatedAmount, setUpdatedAmount] = useState(0);
    const [updatedDescription, setUpdatedDescription] = useState("");

    const filteredData = useMemo(() => {
        return transactions?.filter((t) => t.type === type) || [];
    }, [transactions, type]);

    const handleDelete = (id: string) => {
        deleteTransaction(id);
    };

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setUpdatedAmount(transaction.amount);
        setUpdatedDescription(transaction.description);
        setEditDialogOpen(true);
    };

    const handleSaveEdit = () => {
        if (selectedTransaction) {
            updateTransaction({
                id: selectedTransaction._id,
                amount: updatedAmount,
                description: updatedDescription
            });
            setEditDialogOpen(false);
        }
    };

    const CustomActions = ({ data }) => {
        return (
            <div className="flex gap-4">
                <Button variant="contained" color="error" onClick={() => handleDelete(data._id)}>
                    <Delete />
                </Button>
                <Button variant="contained" onClick={() => handleEdit(data)}>
                    <EditNote />
                </Button>
            </div>
        );
    };

    const CustomCategories = ({ data }) => {
        return (
            <Chip
                label={`${data.emoji} ${data.category}`}
                sx={{ backgroundColor: data.color ? data.color : "#313131" }}
            />
        );
    };

    const colDefs = useMemo(
        () => [
            { field: "date", flex: 1, comparator: dateComparator, sort: "desc" },
            { field: "category", flex: 1, cellRenderer: CustomCategories, filter: false, sortable: false },
            { field: "amount", flex: 1, valueFormatter: (p) => "$" + p.value.toLocaleString() },
            { field: "description", flex: 2, filter: false, sortable: false },
            { field: "actions", flex: 1.3, cellRenderer: CustomActions, filter: false, sortable: false }
        ],
        []
    );

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load transactions</Typography>;
    if (filteredData.length === 0) return <Typography>No {type} transactions available.</Typography>;

    return (
        <>
            <div style={{ height: 500, width: "100%" }}>
                <AgGridReact theme={myTheme} rowData={filteredData} columnDefs={colDefs} />
            </div>

            {/* Dialog for Editing Transaction */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle sx={{ backgroundColor: "#212121", color: "white" }}>Edit Transaction</DialogTitle>
                <DialogContent sx={{ backgroundColor: "#212121" }}>
                    <TextField
                        label="Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={updatedAmount}
                        onChange={(e) => setUpdatedAmount(Number(e.target.value))}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                        sx={{ marginBottom: 3 }}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        variant="standard"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#212121" }}>
                    <Button color="error" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
