const ConfirmDelete = ({ modalToggle, deleteRoutine }) => {

    return (
        <div className="modal-background">

            <div className="modal confirm-delete-modal">
                <button onClick={modalToggle} className="close-modal">X</button>

                <div className="confirmation-window">
                    <p>Are you sure you wish to delete?</p>
                    <p>Routine deletion is permanent</p>
                    <div className="deletion-buttons">
                        <button className="modal-option" onClick={deleteRoutine}>Delete</button>
                        <button className="modal-option" onClick={modalToggle}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete;
