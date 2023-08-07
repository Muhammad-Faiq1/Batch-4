import React, { memo, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import CustomSpinner from "../CustomSpinner/CustomSpinner";

function AddNote(props) {
    const { getNotes } = props;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loader, setLoader] = useState(false);

    const titleChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value)
    }

    const contentChange = (e) => {
        e.preventDefault();
        setContent(e.target.value)
    }

    const addNoteHandler = async (event) => {
        event.preventDefault();
        if (!title || !content) {
            alert("Fill the value")
            return
        }
        setLoader(true)
        try {
            await addDoc(collection(db, "notes"), {
                note: {
                    title,
                    content,
                    favorite: false,
                },
            });
        } catch (error) {
            console.error(error)
        }
        setTitle("");
        setContent("");
        setLoader(false);

        getNotes();

    }
    return (
        <div className="section form-container">
            <CustomSpinner loading={loader} />
            <form className="white" onSubmit={addNoteHandler}>
                <h5 className="grey-text text-darken-3">New Note</h5>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="note_title"
                            type="text"
                            className="validate"
                            onChange={titleChange}
                            value={title}

                        />
                        <label className="active">Title</label>
                    </div>
                </div>

                <div className="input-field col s12">
                    <textarea
                        id="note_content"
                        className="materialize-textarea"
                        onChange={contentChange}
                        value={content}
                    ></textarea>
                    <label>Content</label>
                </div>
                <button className="btn green" type="submit">
                    Add Note
                </button>
            </form>
        </div>
    )
}

export default memo(AddNote)
