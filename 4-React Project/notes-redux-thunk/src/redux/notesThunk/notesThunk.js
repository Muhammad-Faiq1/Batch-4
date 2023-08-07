import { createAsyncThunk } from "@reduxjs/toolkit"
import { collection, getDocs } from 'firebase/firestore'
import { db } from "../../config/firebaseConfig";
// get Notes


export const getNotesThunkMethod = createAsyncThunk(
    "notes/getNotes",
    async () => {
        let notesDataResponse;
        await getDocs(collection(db, "notes")).then((querySnapShop) => {
            const notesData = querySnapShop.docs.map((singleDocument) => {
                return {
                    ...singleDocument.data().note,
                    id: singleDocument.id,
                };
            });

            notesDataResponse = notesData;
        });

        return notesDataResponse;
    }
);