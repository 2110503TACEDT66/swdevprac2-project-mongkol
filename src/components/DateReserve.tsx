"use client"
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select , MenuItem } from "@mui/material";
import { Dayjs } from "dayjs";
import { useState } from "react";


export default function DateReserve({onDateChange} : {onDateChange: Function}) {

    const [date, setDate] = useState<Dayjs | null>(null);

    return (
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white" onChange={(value:Dayjs|null) => { setDate(value); onDateChange(value) }}/>
            </LocalizationProvider>
        </div>
    );
}