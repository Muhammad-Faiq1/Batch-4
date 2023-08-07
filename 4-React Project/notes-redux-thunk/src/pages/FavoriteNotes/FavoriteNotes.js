import React from 'react'
import NoteListing from '../../Components/NoteListing/NoteListing'
import { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useEffect } from 'react';
import { useCallback } from 'react';

function FavoriteNotes() {
    const [notes, setNotes] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = useCallback(async () => {
        setLoader(true)
        await getDocs(collection(db, "notes")).then((querySnapShop) => {
            const notesData = querySnapShop.docs.map(singleDocument => {
                return {
                    ...singleDocument.data().note,
                    id: singleDocument.id,
                }
            }).filter(singleNote => singleNote.favorite);

            setNotes(notesData);
        })
        setLoader(false)

    }, [notes, loader]);

    return (
        <div>
            <NoteListing notes={notes} getNotes={getNotes} />
        </div>
    )
}

export default FavoriteNotes
