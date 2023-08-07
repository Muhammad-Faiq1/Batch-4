import React, { useCallback, useEffect, useState } from 'react'
import AddNote from '../../Components/AddNote/AddNote'
import NoteListing from '../../Components/NoteListing/NoteListing'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';


function Home() {
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
            });
            console.log(notesData, " notesData")
            setNotes(notesData);
        })
        setLoader(false)

    }, [notes, loader]);


    return (
        <div>

            <div className="container ">
                <div className="row center-align">
                    <div className="col s7">
                        <AddNote getNotes={getNotes} />
                    </div>
                    <div className="col s5">
                        <NoteListing notes={notes} getNotes={getNotes} />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Home
