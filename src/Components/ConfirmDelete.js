// import { useState } from "react";
// import realtime from '../firebase.js';
// import { ref, push } from 'firebase/database';

// set a status for the edit modal as well. it can be the same one but just load from firebase instead
const ConfirmDelete = ({ modalToggle }) => {

    return (
        <div className="modalBackground">

            <div className="modal confirmDeleteModal">
                <button onClick={modalToggle}>X</button>

            </div>
        </div>
    )
}

export default ConfirmDelete;
