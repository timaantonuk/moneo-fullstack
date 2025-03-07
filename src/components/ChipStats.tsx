import { Chip, Typography } from "@mui/material";

type TChipStatsProps = {
    amount: number;
    variant: "primary" | "error";
    type: "income" | "expenses";
};

function ChipStats({ amount, variant, type }: TChipStatsProps) {
    return (
        <Chip
            label={
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '1.2rem' }}> {/* Увеличил шрифт */}
                    Total {type === "income" ? "Budget" : "Expenses"}: {amount}$
                </Typography>
            }
            color={variant}
            variant="filled"
            sx={{
                height: 48,
                paddingX: 2,
                '& .MuiChip-label': {
                    display: 'flex',
                    alignItems: 'center',
                },
            }}
        />
    );
}

export default ChipStats;
