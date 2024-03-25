import { useAppSelector } from '@/redux/store';
import { bookItem } from '../../interface';
import { useDispatch } from 'react-redux';
import { removeBook } from '@/redux/features/bookSlice';

export default function BookingView() {
    const bookItems = useAppSelector(state => state.bookSlice.bookItems);
    const dispatch = useDispatch(); // Get the dispatch function
    
    return (
        <>
        {
            bookItems.map((booking: bookItem) => (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={booking.id}>
                    <p>{booking.dentistId}</p>
                    <p>{booking.userId}</p>
                    <p>{booking.bookingDate}</p>

                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
                        onClick={() => dispatch(removeBook(booking.id))}>
                            Remove Booking
                    </button> 
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white">
                            Edit Booking
                    </button> 
                </div>
            ))
        }
        </>
    )
}
