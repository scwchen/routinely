import { useState } from "react";
import realtime from '../firebase.js';
import { ref, push } from 'firebase/database';

// set a status for the edit modal as well. it can be the same one but just load from firebase instead
const AddRoutine = ({ modalToggle, user }) => {

    // State for the name and description of the routine
    const [routineName, setRoutineName] = useState('');
    const [routineDescription, setRoutineDescription] = useState('');

    // Array for the user selected frequency
    const [checkedDays, setCheckedDays] = useState([]);

    // Holding error keywords for conditional rendering
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (routineName && checkedDays.length !== 0) {

            const dbRef = ref(realtime, user);

            const newRoutine = {
                routineName: routineName,
                frequency: checkedDays,
                completed: ["0000-00-00"],
                description: routineDescription,
            }

            console.log(dbRef);
            push(dbRef, newRoutine);
            // resetting the state values for what happens next
            setRoutineDescription('');
            setRoutineName('');
            setError('');

            // Closing the AddRoutine modal
            modalToggle();

        } else if (!routineName && checkedDays.length !== 0) {
            handleErrorStatus('name');
        } else if (routineName && checkedDays.length === 0) {
            handleErrorStatus('day');
        } else {
            handleErrorStatus('all');
        }
    };

    // Handling the various states for the checkboxes and what we will send to Firebase
    const handleDayClick = (e) => {
        e.target.classList.toggle('chosen');

        const dayValue = parseInt(e.target.value);
        let newDays = [];

        if (e.target.classList.contains('chosen')) {
            newDays = [...checkedDays, dayValue];
        } else {
            newDays = checkedDays.filter((day) => day !== dayValue);
        }

        setCheckedDays(newDays.sort());
    };

    // Handling the change of the routine name - required
    const handleNameChange = (e) => {
        setRoutineName(e.target.value);
    };

    // Handling the change of the description - not required
    const handleDescriptionChange = (e) => {
        setRoutineDescription(e.target.value);
    }

    // Handling the errors when adding a routine
    const handleErrorStatus = (errorStatus) => {
        setError(errorStatus);
    }

    return (
        <div className="modal-background">

            <div className="modal add-routine-modal">
                <button onClick={modalToggle} className="close-modal">X</button>

                <form className="add-routine-modal-form" onSubmit={handleSubmit}>

                    <fieldset className="routine-name-details">
                        <label htmlFor="routine-name">Name</label>
                        <input type="text" id="routine-name" maxLength="25" onChange={handleNameChange} value={routineName} />
                    </fieldset>

                    {error === 'name' && <p className="error-message">Give your routine a name. You'll feel better if you do!</p>}

                    <fieldset className="routine-description-details">
                        <label htmlFor="routine-description">Description</label>
                        <textarea id="routine-description" maxLength="200" onChange={handleDescriptionChange} value={routineDescription} />
                    </fieldset>

                    <div className="add-check-days">
                        {/* Made them type button to avoid submiting the form  */}
                        <button type="button" className="add-day" value={0} onClick={handleDayClick}>S</button>
                        <button type="button" className="add-day" value={1} onClick={handleDayClick}>M</button>
                        <button type="button" className="add-day" value={2} onClick={handleDayClick}>T</button>
                        <button type="button" className="add-day" value={3} onClick={handleDayClick}>W</button>
                        <button type="button" className="add-day" value={4} onClick={handleDayClick}>T</button>
                        <button type="button" className="add-day" value={5} onClick={handleDayClick}>F</button>
                        <button type="button" className="add-day" value={6} onClick={handleDayClick}>S</button>
                    </div>

                    {error === 'day' && <p className="error-message">Please select the days you wish to set for the routine</p>}
                    {error === 'all' && <p className="error-message">Please provide some input. That would be a good habit.</p>}

                    <button className="modal-option" type="submit">Add Routine</button>
                </form>

            </div>
        </div>
    )
}

export default AddRoutine;
