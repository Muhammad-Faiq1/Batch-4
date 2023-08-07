import React, { useEffect, useState } from 'react'
import CustomSpinner from '../../../Components/CustomSpinner/CustomSpinner'
import { useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig"
import { getNodeText } from '@testing-library/react';

function NoteEditPage() {
    const [loader, setLoader] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const { note_id } = useParams();

    useEffect(() => {
        if (note_id) {
            getNotById();
        }
    }, [note_id]);

    const getNotById = async () => {
        setLoader(true)
        const documentReference = doc(db, "notes", note_id);
        const documentSnapShot = await getDoc(documentReference)
        const noteData = documentSnapShot.data();
        // console.log(noteData, "noteData")
        setTitle(noteData?.note?.title);
        setContent(noteData?.note?.content);
        setLoader(false)
    }

    const updateNoteHandler = async (event) => {
        event.preventDefault();
        if (!title || !content) {
            alert("Fill the value")
        }
        const documentReference = doc(db, "notes", note_id);
        setLoader(true)
        try {
            await updateDoc(documentReference, {
                note: {
                    title,
                    content,
                }

            });
            getNodeText()

        } catch (error) {
            console.error("Error on update", error);
        }
        setLoader(false)
    }

    return (
        <div className="section form-container">
            <CustomSpinner loading={loader} />
            <form className="white" onSubmit={updateNoteHandler}>
                <h5 className="grey-text text-darken-3">Update Note</h5>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="note_title"
                            type="text"
                            className="validate"
                            onChange={(event) => {
                                setTitle(event.target.value)
                            }}
                            value={title}

                        />

                        <label className="active" >Title</label>
                    </div>
                </div>

                <div className="input-field col s12">
                    <textarea
                        id="note_content"
                        className="materialize-textarea"
                        onChange={(event) => {
                            setContent(event.target.value)
                        }}
                        value={content}
                    ></textarea>
                    <label className='active' >Content</label>
                </div>
                <button className="btn green" type="submit">
                    Update Note
                </button>
            </form>
        </div>
    )
}

export default NoteEditPage
