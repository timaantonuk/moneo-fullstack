"use client"

import { useState } from "react"
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import { useMemo } from "react"
import { useTransactions } from "../hooks/useTransactions.ts"
import { useDeleteTransaction } from "../hooks/useDeleteTransaction.ts"
import { useUpdateTransaction } from "../hooks/useUpdateTransaction.ts"
import {
    Button,
    Chip,
    CircularProgress,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
} from "@mui/material"
import { Delete, EditNote } from "@mui/icons-material"
import { dateComparator } from "../utils/functions.ts"
import { useTranslation } from "react-i18next"

ModuleRegistry.registerModules([AllCommunityModule])

const myTheme = themeQuartz.withParams({
    backgroundColor: "#373737",
    browserColorScheme: "dark",
    chromeBackgroundColor: {
        ref: "foregroundColor",
        mix: 0.07,
        onto: "backgroundColor",
    },
    fontFamily: "inherit",
    foregroundColor: "#FFF",
    headerFontSize: 14,
})

export default function ExpenseAndIncomeTable({ type }: { type: "income" | "expense" }) {
    const { data: transactions, isLoading, error } = useTransactions()
    const { mutate: deleteTransaction } = useDeleteTransaction()
    const { mutate: updateTransaction } = useUpdateTransaction()
    const { t } = useTranslation()

    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
    const [updatedAmount, setUpdatedAmount] = useState(0)
    const [updatedDescription, setUpdatedDescription] = useState("")

    const filteredData = useMemo(() => {
        return transactions?.filter((t) => t.type === type) || []
    }, [transactions, type])

    const handleDelete = (id: string) => {
        deleteTransaction(id)
    }

    const handleEdit = (transaction: any) => {
        setSelectedTransaction(transaction)
        setUpdatedAmount(transaction.amount)
        setUpdatedDescription(transaction.description || "")
        setEditDialogOpen(true)
    }

    const handleSaveEdit = () => {
        if (selectedTransaction) {
            updateTransaction({
                id: selectedTransaction._id,
                amount: updatedAmount,
                description: updatedDescription,
            })
            setEditDialogOpen(false)
        }
    }

    const CustomActions = ({ data }: { data: any }) => {
        return (
            <div className="flex gap-4">
                <Button variant="contained" color="error" onClick={() => handleDelete(data._id)}>
                    <Delete />
                </Button>
                <Button variant="contained" onClick={() => handleEdit(data)}>
                    <EditNote />
                </Button>
            </div>
        )
    }

    const CustomCategories = ({ data }: { data: any }) => {
        return (
            <Chip label={`${data.emoji} ${data.category}`} sx={{ backgroundColor: data.color ? data.color : "#313131" }} />
        )
    }

    const colDefs = useMemo(
        () => [
            { field: "date", headerName: t("transactions.date"), flex: 1, comparator: dateComparator, sort: "desc" },
            {
                field: "category",
                headerName: t("transactions.category"),
                flex: 1,
                cellRenderer: CustomCategories,
                filter: false,
                sortable: false,
            },
            {
                field: "amount",
                headerName: t("transactions.amount"),
                flex: 1,
                valueFormatter: (p: any) => "$" + p.value.toLocaleString(),
            },
            { field: "description", headerName: t("transactions.description"), flex: 2, filter: false, sortable: false },
            {
                field: "actions",
                headerName: t("transactions.actions"),
                flex: 1.3,
                cellRenderer: CustomActions,
                filter: false,
                sortable: false,
            },
        ],
        [t],
    )

    if (isLoading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px", width: "100%" }}>
                <CircularProgress />
            </Box>
        )

    if (error) return <Typography color="error">{t("errors.failedToLoad", { item: "transactions" })}</Typography>

    if (filteredData.length === 0)
        return <Typography>{type === "income" ? t("income.noIncome") : t("expenses.noExpenses")}</Typography>

    return (
        <>
            <div style={{ height: 500, width: "100%", overflowX: "auto" }}>
                <div style={{ minWidth: "800px", height: "100%" }}>
                    <AgGridReact theme={myTheme} rowData={filteredData} columnDefs={colDefs} />
                </div>
            </div>

            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle sx={{ backgroundColor: "#212121", color: "white" }}>
                    {t("transactions.editTransaction")}
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: "#212121" }}>
                    <TextField
                        label={t("transactions.amount")}
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
                        label={t("transactions.description")}
                        fullWidth
                        variant="standard"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#212121" }}>
                    <Button color="error" onClick={() => setEditDialogOpen(false)}>
                        {t("common.cancel")}
                    </Button>
                    <Button variant="contained" onClick={handleSaveEdit}>
                        {t("common.save")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

