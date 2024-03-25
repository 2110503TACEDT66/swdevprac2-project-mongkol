"use client"
import { useEffect, useState } from 'react';
import DateReserve from "@/components/DateReserve";
import TextField from '@mui/material/TextField';
import { Select, MenuItem } from '@mui/material';
import { useSearchParams } from "next/navigation"; // Changed from "next/navigation" to "next/router"
import getDentist from "@/libs/getDentist";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addBook } from '@/redux/features/bookSlice';
import { bookItem } from '../../../interface';
import dayjs, { Dayjs } from 'dayjs';
import { useSession } from 'next-auth/react';
import getUserProfile from '@/libs/getUserProfile';

export default function Reservations() {

    const urlParams = useSearchParams();
    const dentistId = urlParams.get("dentist");

    const uesrId = "1234567890"; // Hardcoded for now
    const [date, setDate] = useState<Dayjs | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const makeBooking = async () => {

        console.log(dentistId)
        console.log(date)
        console.log(uesrId)

        if (dentistId && date && uesrId) {
            console.log(`Booking for ${uesrId} at ${dentistId} on ${date}`);
            const item:bookItem = {
                userId: uesrId,
                dentistId: dentistId,
                bookingDate: dayjs(date).format("YYYY-MM-DD")
            }
            dispatch(addBook(item));
            console.log("Booking added")
        } else {
            console.log("Booking failed")
        }
    }

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">

            {/* <TextField name="Name-Lastname" label="Name-Lastname" variant="standard"/>
            <TextField name="Citizen ID" label="Citizen ID" variant="standard"/>

            <Select id="hospital" label="Hospital" variant="standard">
                <MenuItem value="Chula">Chulalongkorn Hospital</MenuItem>
                <MenuItem value="Rajavithi">Rajavithi Hospital</MenuItem>
                <MenuItem value="Thammasat">Thammasat University Hospital</MenuItem>
            </Select> */}

            <div className="w-fit space-y-2">
                <DateReserve  onDateChange={(value:Dayjs|null) => {setDate(value)}}/>
            </div>

            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm" name="Book Vaccine" onClick={makeBooking}>Book Vaccine</button>
        </main>
    );
}
