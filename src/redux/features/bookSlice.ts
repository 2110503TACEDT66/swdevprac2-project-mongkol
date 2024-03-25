import { createSlice } from "@reduxjs/toolkit";
import { bookItem } from "../../../interface";

type bookState = {
    bookItems: bookItem[]
}

const initialState: bookState = { bookItems: []}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.bookItems.push(action.payload)
        }
    }
})

export const { addBook } = bookSlice.actions
export default bookSlice.reducer