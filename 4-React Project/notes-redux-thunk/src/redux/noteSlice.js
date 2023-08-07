import { createSlice } from "@reduxjs/toolkit";
import {
    getNotesThunkMethod,
} from "./notesThunk/notesThunk";


const initialState = {
    notes: [],
    loading: false,
};

export const noteSlice = createSlice({
    name: "notes",
    initialState,
    extraReducers: {
        [getNotesThunkMethod.pending]: (state) => {
            state.loading = true;
        },
        [getNotesThunkMethod.fulfilled]: (state, parameter) => {
            const { payload } = parameter;
            state.loading = false;
            state.notes = payload;
        },
        [getNotesThunkMethod.rejected]: (state) => {
            state.loading = false;
        },


    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = noteSlice.actions;

export default noteSlice.reducer;
