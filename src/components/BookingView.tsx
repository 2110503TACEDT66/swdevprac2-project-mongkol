"use client"
import { useAppSelector } from '@/redux/store';
import { bookItem } from '../../interface';
export default function BookingView() {
    const bookItems = useAppSelector(state => state.bookSlice.bookItems);
    return (
        <>
        {
            bookItems.map((booking: bookItem) => (
                <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
                    <p>{booking.dentistId}</p>
                    <p>{booking.userId}</p>
                    <p>{booking.bookingDate}</p>
                </div>
            ))
        }
        </>
    )
}