"use client"

import type React from "react"
import { useState } from "react"
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material"
import { useTranslation } from "react-i18next"

type SortPeriod = "all" | "month" | "day"

function SortDropdown({ onChange }: { onChange: (period: SortPeriod) => void }) {
    const [sortPeriod, setSortPeriod] = useState<SortPeriod>("all")
    const { t } = useTranslation()

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const period = event.target.value as SortPeriod
        setSortPeriod(period)
        onChange(period)
    }

    return (
        <FormControl variant="outlined" size="small" className="lg:justify-self-end lg:self-end w-full lg:w-auto">
            <InputLabel id="sort-by-label">{t("dashboard.sortBy")}</InputLabel>
            <Select labelId="sort-by-label" value={sortPeriod} onChange={handleChange} label={t("dashboard.sortBy")}>
                <MenuItem value="all">{t("dashboard.sortOptions.all")}</MenuItem>
                <MenuItem value="month">{t("dashboard.sortOptions.month")}</MenuItem>
                <MenuItem value="day">{t("dashboard.sortOptions.day")}</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SortDropdown

