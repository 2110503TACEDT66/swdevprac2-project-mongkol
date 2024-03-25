import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; // Importing uuidv4 from uuid library
import { bookItem } from "../../../interface";
import getBookings from "@/libs/getBookings"
import { Dispatch } from "react"

type bookState = {
    bookItems: bookItem[];
};

const initialState: bookState = { bookItems: [] };

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<bookItem>) => {
            const userBooking = state.bookItems.filter((booking) => booking.userId === action.payload.userId);
            if (userBooking.length < 10000) {
                const newBooking = {
                    ...action.payload,
                    id: uuidv4(),
                };
                state.bookItems.push(newBooking);
            } else {
                console.log("User has reached the maximum booking limit")
            }
        },

        removeBook: (state, action: PayloadAction<string>) => {
            state.bookItems = state.bookItems.filter((booking) => booking.id !== action.payload);
        },
    },
});

export const { addBook, removeBook } = bookSlice.actions;
export default bookSlice.reducer;

export function fetchBookingsAndDispatch(dispatch: Dispatch<any>, token: string) {
    getBookings(token)
        .then(bookings => {
            dispatch(bookSlice.actions.addBook(bookings)); // Dispatch action to add fetched bookings
        })
        .catch(error => {
            console.error("Error fetching bookings:", error);
            // Handle error appropriately
        });
    // console.log(book)
}