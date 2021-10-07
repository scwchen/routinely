import { useState } from "react";
import realtime from '../firebase.js';
import { ref, push } from 'firebase/database';
// import showDate from "../Functions/dateFunctions.js";

// set a status for the edit modal as well. it can be the same one but just load from firebase instead
const AddRoutine = ({ modalToggle }) => {

    // State for the name and description of the routine
    const [routineName, setRoutineName] = useState('');
    const [routineDescription, setRoutineDescription] = useState('');

    // States for each of the day inputs
    const [checkedDay1, setCheckedDay1] = useState(false);
    const [checkedDay2, setCheckedDay2] = useState(false);
    const [checkedDay3, setCheckedDay3] = useState(false);
    const [checkedDay4, setCheckedDay4] = useState(false);
    const [checkedDay5, setCheckedDay5] = useState(false);
    const [checkedDay6, setCheckedDay6] = useState(false);
    const [checkedDay7, setCheckedDay7] = useState(false);

    // 
    const [checkedDays, setCheckedDays] = useState([]);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (routineName && checkedDays.length !== 0) {

            const dbRef = ref(realtime);

            const newRoutine = {
                routineName: routineName,
                frequency: checkedDays,
                completed: ["0000-00-00"],
                description: routineDescription,
            }

            push(dbRef, newRoutine);
            // resetting the text area value by changing the state value
            setRoutineDescription('');
            setRoutineName('');
            // Closing the AddRoutine modal
            modalToggle();

            // change to modals or something
        } else if (!routineName && checkedDays.length !== 0) {
            alert(`Give your routine a name. You'll feel better if you do!`);
        } else if (routineName && checkedDays.length === 0) {
            alert('Please select the days you wish to set for the routine');
        } else {
            alert('What are you doing?');
        }
    };

    // Handling the various states for the checkboxes and what we will send to Firebase
    const handleDayChange = (e, setDay, day) => {
        const checked = e.target.checked;
        setDay(checked);

        const dayValue = parseInt(e.target.value);
        let newDays = [];

        if (checked) {
            newDays = [...checkedDays, dayValue];
        } else {
            newDays = checkedDays.filter((day) => day !== dayValue);
        }

        setCheckedDays(newDays.sort());
    };

    const handleNameChange = (e) => {
        setRoutineName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setRoutineDescription(e.target.value);
    }

    return (
        <div className="modalBackground">

            <div className="modal addRoutineModal">
                <button onClick={modalToggle} className="closeModal">X</button>

                <form className="addRoutineModalForm" onSubmit={handleSubmit}>

                    <fieldset className="routineNameDetails">
                        <label htmlFor="routineName">Name</label>
                        <input type="text" id="routineName" maxLength="25" onChange={handleNameChange} value={routineName} />
                    </fieldset>

                    <fieldset className="routineDescriptionDetails">
                        <label htmlFor="routineDescription">Description</label>
                        <textarea id="routineDescription" maxLength="200" onChange={handleDescriptionChange} value={routineDescription}/>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="Sun">S</label>
                        <input onChange={(e) => handleDayChange(e, setCheckedDay1, checkedDay1)} type="checkbox" name="daysOfWeek" id="Sun" checked={checkedDay1} value={0} />
                        <label htmlFor="Mon">M</label>
                        <input onChange={(e) => handleDayChange(e, setCheckedDay2, checkedDay2)} type="checkbox" name="daysOfWeek" id="Mon" checked={checkedDay2} value={1} />
                        <label htmlFor="Tue">T</label>
                        <input onChange={(e) => handleDayChange(e, setCheckedDay3, checkedDay3)} type="checkbox" name="daysOfWeek" id="Tues" checked={checkedDay3} value={2} />
                        <label htmlFor="Wed">W</label>
                        <input onChange={(e) => handleDayChange(e, setCheckedDay4, checkedDay4)} type="checkbox" name="daysOfWeek" id="Wed" checked={checkedDay4} value={3} />
                        <label htmlFor="Thu">T</label>
                        <input onChange={(e) => handleDayChange(e, setCheckedDay5, checkedDay5)} type="checkbox" name="daysOfWeek" id="Thu" checked={checkedDay5} value={4} />
                        <label htmlFor="Fri">F</label>
                        <input onChange={(e) => handleDayChange(e, setCheckedDay6, checkedDay6)} type="checkbox" name="daysOfWeek" id="Fri" checked={checkedDay6} value={5} />
                        <label htmlFor="Sat">S</label>
                        <input onChange={(e) => handleDayChange(e, setCheckedDay7, checkedDay7)} type="checkbox" name="daysOfWeek" id="Sat" checked={checkedDay7} value={6} />
                    </fieldset>

                    <button type="submit">Add Routine</button>
                </form>

            </div>
        </div>
    )
}

export default AddRoutine;
