import { useEffect } from 'react';
import AddNote from '../../Components/AddNote/AddNote';
import NoteListing from '../../Components/NoteListing/NoteListing';
import { useDispatch } from 'react-redux';
import { getNotesThunkMethod } from '../../redux/notesThunk/notesThunk';



function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getNotesThunkMethod())
    }, []);




    return (
        <div>

            <div className="container ">
                <div className="row center-align">
                    <div className="col s7">
                        <AddNote />
                    </div>
                    <div className="col s5">
                        <NoteListing />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Home
