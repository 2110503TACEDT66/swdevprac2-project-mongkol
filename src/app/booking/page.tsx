"use client"
import { useEffect, useState } from 'react';
import DateReserve from "@/components/DateReserve";
import { redirect, useSearchParams } from "next/navigation"; // Changed from "next/navigation" to "next/router"
import dayjs, { Dayjs } from 'dayjs';
import { useSession } from 'next-auth/react';
import createBooking from '@/libs/createBooking';
import getDentists from '@/libs/getDentists';
import Link from 'next/link';
// import { useRouter } from 'next/router';

import { useRouter } from 'next/router'; // Import useRouter from next/router
import getBookings from '@/libs/getBookings';
import getUserProfile from '@/libs/getUserProfile';
import { set } from 'mongoose';
import getDentist from '@/libs/getDentist';

export default function Reservations() {
    const urlParams = useSearchParams();
    const dentistId = urlParams.get("dentist");

    const [role , setRole] = useState<string>("")
    const [dentist, setDentist] = useState(null);
    const [bookingCount, setBookingCount] = useState<number>(9999999);
    const [userName, setUserName] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(null);
    const [showSelectDentistBtn, setShowSelectDentistBtn] = useState(false);

    const session = useSession();
    const token = session.data?.user.token;
    // const router = useRouter();

    useEffect(() => {
        async function fetchBookings() {
            if (token) {
                try {
                    const bookingData = await getBookings(token);
                    const profile = await getUserProfile(token);
                    if (!dentistId) {
                        setShowSelectDentistBtn(true);
                        return;
                    }
                    const dentist = await getDentist(dentistId);
                    console.log(profile)
                    console.log(bookingData); // Verify the structure of bookingData
                    console.log(dentist.data.name)
                    setBookingCount(bookingData.count);
                    setUserName(profile.data.name)
                    setDentist(dentist.data.name)
                    setRole(profile.data.role)
                } catch (error) {
                    console.error('Error fetching bookings:', error);
                }
            }
        }
        fetchBookings();
    }, []);

    const makeBooking = async () => {
        console.log(dentistId)
        console.log(date)
        console.log(token)

        if (dentist && dentistId && date && token && bookingCount < 1 || role === "admin" && dentistId && date && token && dentist) {
            createBooking(dentistId, token, date.toDate() , userName , dentist)
            console.log("Booking added")
        } else {
            console.log("Booking failed")
            alert("Booking failed")
        }
    }

    return (
        <div className='flex justify-center'>
            <main className="w-[70%] flex flex-col justify-center items-center space-y-4 bg-white mt-10 p-5 rounded-xl">
        <div>
            <h1 className='font-bold font-serif text-xl mb-5'>Booking Confirmation</h1>
        </div>
        {showSelectDentistBtn ? (
            <div>
                <h1>Please Select Dentist First</h1>
                <Link href='/dentist'>Select Dentist</Link>
            </div>
        ) : (
            <table className="border-collapse border border-gray-200 rounded-md shadow-md">
                <tbody>
                    <tr className="border-b border-gray-200">
                        <td className="p-2 font-semibold">User :</td>
                        <td className="p-2">{userName}</td> 
                    </tr>
                    <tr className="border-b border-gray-200">
                        <td className="p-2 font-semibold">Dentist :</td>
                        <td className="p-2">{dentist}</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-semibold">Reservation Date :</td>
                        <td className="p-2"><DateReserve onDateChange={(value: Dayjs | null) => { setDate(value) }} /></td>
                    </tr>
                </tbody>
            </table>
        )}
        {!showSelectDentistBtn && (
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm" name="Book Dentist" onClick={makeBooking}>Book Dentist</button>
        )}
    </main>    
    </div>
    );
}