import React, { memo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from "../../config/firebaseConfig"
import { doc, deleteDoc, updateDoc } from "firebase/firestore"
import CustomSpinner from '../CustomSpinner/CustomSpinner';
function NoteListing(props) {
    const { notes, getNotes } = props;
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const deleteHandler = async (event, singleNote) => {
        event.preventDefault();
        // console.log(singleNote.id, "id")
        // console.log(singleNote, "singleNote")
        if (window.confirm("Are you sure")) {
            setLoader(true)
            try {
                const documentReference = doc(db, "notes", singleNote.id)
                await deleteDoc(documentReference)
            } catch (error) {
                console.error(error);
            }
        }
        setLoader(false)
        getNotes();
    }

    const favoriteHandler = async (event, singleNote) => {
        event.preventDefault();
        const { favorite = false, id: noteId } = singleNote;
        const documentReference = doc(db, "notes", noteId)
        setLoader(true)
        try {
            await updateDoc(documentReference, {
                note: {
                    ...singleNote,
                    favorite: !favorite
                }
            })
            getNotes()
        } catch (error) {
            console.error(error)
        }
        setLoader(false)
    }



    return (
        <div className="notesList">
            <CustomSpinner loading={loader} />

            {notes?.length > 0 &&
                notes.map((singleNote) => {
                    const heartIcon = singleNote?.favorite ? "favorite" : "favorite_border"
                    return (
                        <div className='note white' key={singleNote.id}>
                            <div className="right-align">
                                <i
                                    className="material-icons red-text"
                                    style={{ cursor: "pointer" }}
                                    onClick={(event) => favoriteHandler(event, singleNote)}
                                >
                                    {heartIcon}
                                </i>
                                <i
                                    className="material-icons"
                                    style={{ cursor: "pointer" }}
                                    onClick={(event) => deleteHandler(event, singleNote)}
                                >
                                    delete
                                </i>
                            </div>
                            <Link to=""> <h5 className="black-text">Title: {singleNote.title}</h5></Link>
                            <p className='truncate'>Content: {singleNote.content}</p>
                            <div className="right-align">
                                <Link to="">
                                    <i
                                        className="material-icons black-text"
                                        style={{ cursor: "pointer" }}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            navigate(`/note/${singleNote.id}`)
                                        }}

                                    >
                                        edit
                                    </i>
                                </Link>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default memo(NoteListing)
