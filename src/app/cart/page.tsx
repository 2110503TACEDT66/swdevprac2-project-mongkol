"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/getBookings";
import deleteBooking from "@/libs/deleteBooking";
import updateBooking from "@/libs/updateBooking";
import Link from "next/link";
import getDentists from "@/libs/getDentists";
import DateReserve from "@/components/DateReserve";
import dayjs from "dayjs";
import getDentist from "@/libs/getDentist";
import { get } from "http";
import { bookItem, dentistItem } from "../../../interface";
import { Dayjs } from "dayjs";

export default function MyBooking() {
    const [bookings, setBookings] = useState([]);
    const [count, setCount] = useState(0);
    const [editedBookingId, setEditedBookingId] = useState(""); // Track the ID of the booking being edited
    const [editedDentistId, setEditedDentistId] = useState(""); // State to track edited dentist ID
    const [dentistName , setDentistName] = useState("");
    const [dentists, setDentists] = useState([]); // State to store dentists data
    const session = useSession();
    const token = session.data?.user.token;
    const [date, setDate] = useState(null);
    
    const getDentistName = async(dentistsId:string) => {
        const profile = await getDentist(dentistsId);
        setDentistName(profile.data.name);
        // console.log("Dentist Name hereherer:", profile.data.name)
        // return profile.data.name;
    }

    useEffect(() => {
        if (token) {
            getBook();
        }
        getDentists()
            .then(response => {
                if (Array.isArray(response.data)) {
                    setDentists(response.data); // Set dentists data to state
                    console.log("Dentists:", response.data)
                } else {
                    console.error('Error: Response data is not an array');
                }
            })
            .catch(error => {
                console.error('Error fetching dentists:', error);
            });
    }, [token]);

    const getBook = async () => {
        if (!token) return;
        const bookings = await getBookings(token);
        setBookings(bookings.data);
        setCount(bookings.count);
        console.log("Bookings:", bookings.data);
    };

    const handleDelete = async (id:string, token1:string | undefined) => {
        try {
            if (token1) {
                await deleteBooking(id, token1);
                console.log("Deleted booking with ID:", id);
                setBookings(prevBookings => prevBookings.filter((item:bookItem) => item._id !== id));
                setCount(prevCount => typeof prevCount === 'number' ? prevCount - 1 : 0);
            }
           
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const handleUpdate = async (id:string , token:string | undefined , date:Date | null , dentistId:string) => {
        try {
            if (token && date) {
                const profile = await getDentist(dentistId);
                const dentistName = profile.data.name;
                await updateBooking(id, token , new Date(date) , dentistId , dentistName);
                getBook();
                // Reset edited booking ID after successful update
                setEditedBookingId("");
                setEditedDentistId(""); // Reset edited dentist ID
            }
          
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    };
    

    const toggleEditMode = (id:string) => {
        setEditedBookingId(id === editedBookingId ? "" : id);
        setEditedDentistId("");
    };

    return (
        <div className="p-5 rounded-md">
            {count > 0 ? (
                <div>
                    <h2 className="text-2xl font-md text-center mt-10 font-serif">Number of Booking in the list : {count} </h2>
                    <div className="mb-5"></div>
                    {bookings.map((bookItem:bookItem) => (
                        <div key={bookItem._id} className="bg-slate-200 rounded-md px-5 mx-5 py-2 my-2">
                            <div className="text-xl">Username : {bookItem.username}</div>
                            <div className="text-xl">Reservation Date : {new Date(bookItem.bookDate).toLocaleDateString()}</div>
                            <div className="text-xl">Dentist : {bookItem.dentistname}</div>
                            {/* <div className="text-xl">{bookItem.dentistId}</div> */}
                            {editedBookingId === bookItem._id ? (
                                <div>
                                    <select
                                        value={editedDentistId}
                                        onChange={(e) => setEditedDentistId(e.target.value)}
                                    >
                                        <option value="">Select Dentist</option>
                                        {dentists.map((dentist:dentistItem) => (
                                            <option key={dentist._id} value={dentist._id}>
                                            {dentist.name}
                                            </option>
                                        ))}
                                    </select>
                                    <DateReserve onDateChange={(value: Dayjs | null) => { setDate(value as null) }} />
                                    <button
                                        className="text-white bg-blue-500 rounded-md px-3 py-1"
                                        onClick={() => handleUpdate(bookItem._id, token, date , editedDentistId)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="text-white bg-gray-500 rounded-md px-3 py-1"
                                        onClick={() => toggleEditMode(bookItem._id)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="mr-2 text-white bg-red-500 rounded-md px-3 py-1"
                                        onClick={() => handleDelete(bookItem._id, token)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="text-white bg-blue-500 rounded-md px-3 py-1"
                                        onClick={() => toggleEditMode(bookItem._id)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h1 className="text-xl font-bold text-center mt-10">No bookings found</h1>
                    <Link href="/dentist" className="text-xl font-bold text-center mt-10">Check Our Dentist for a Booking</Link>
                </div>
            )}
        </div>
    );
}
