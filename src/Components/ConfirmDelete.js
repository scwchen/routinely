const ConfirmDelete = ({ modalToggle, deleteRoutine }) => {

    return (
        <div className="modalBackground">

            <div className="modal confirmDeleteModal">
                <button onClick={modalToggle} className="closeModal">X</button>

                <div className="confirmationWindow">
                    <p>Are you sure you wish to delete?</p>
                    <p>Routine deletion is permanent</p>
                    <div className="deletionButtons">
                        <button className="modalOption" onClick={deleteRoutine}>Delete</button>
                        <button className="modalOption" onClick={modalToggle}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete;
