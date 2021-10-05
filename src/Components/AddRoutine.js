import { useState } from "react";
import realtime from '../firebase.js';
import { ref, push } from 'firebase/database';

const AddRoutine = (props) => {
    const { modalChange, modalStatus } = props;

    const [routineName, setRoutineName] = useState('');

    // to control the routine type - stretch goal
    // const [numeric, setNumeric] = useState(false);

    // could do it in a loop or swapping the same state between the checkboxes but did so this way for easier visualization
    const [day1, setDay1] = useState(false);
    const [day2, setDay2] = useState(false);
    const [day3, setDay3] = useState(false);
    const [day4, setDay4] = useState(false);
    const [day5, setDay5] = useState(false);
    const [day6, setDay6] = useState(false);
    const [day7, setDay7] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (routineName) {

            const dbRef = ref(realtime);

            const newRoutine = {
                routineName: routineName,
                frequency: [
                    {
                        day: 1,
                        onDay: day1,
                        isCompleted: false
                    },
                    {
                        day: 2,
                        onDay: day2,
                        isCompleted: false
                    },
                    {
                        day: 3,
                        onDay: day3,
                        isCompleted: false
                    },
                    {
                        day: 4,
                        onDay: day4,
                        isCompleted: false
                    },
                    {
                        day: 5,
                        onDay: day5,
                        isCompleted: false
                    },
                    {
                        day: 6,
                        onDay: day6,
                        isCompleted: false
                    },
                    {
                        day: 7,
                        onDay: day7,
                        isCompleted: false
                    }
                    
                ],
                isNumeric: false
            }

            push(dbRef, newRoutine);
            // resetting the text area value by changing the state value
            setRoutineName('');
            // Closing the AddRoutine modal
            modalChange(!modalStatus);
            
        } else {
            alert(`Give your routine a name. You'll feel better if you do!`);
        }
    };

    const handleChange = (e) => {
        setRoutineName(e.target.value);
    };

    return (
        <div>
            <button onClick={() => modalChange(!modalStatus)}>X</button>

            <form onSubmit={handleSubmit}>
                <label htmlFor="routineName"></label>
                <input type="text" id="routineName" onChange={handleChange} value={routineName} />

                <fieldset>


                    <label htmlFor="sunday">S</label>
                    <input onChange={(e) => setDay1(e.target.checked)} type="checkbox" name="daysOfWeek" id="sunday" value={day1} />
                    <label htmlFor="monday">M</label>
                    <input onChange={(e) => setDay2(e.target.checked)} type="checkbox" name="daysOfWeek" id="monday" value={day2} />
                    <label htmlFor="tuesday">T</label>
                    <input onChange={(e) => setDay3(e.target.checked)} type="checkbox" name="daysOfWeek" id="tuesday" value={day3} />
                    <label htmlFor="wednesday">W</label>
                    <input onChange={(e) => setDay4(e.target.checked)} type="checkbox" name="daysOfWeek" id="wednesday" value={day4} />
                    <label htmlFor="thursday">T</label>
                    <input onChange={(e) => setDay5(e.target.checked)} type="checkbox" name="daysOfWeek" id="thursday" value={day5} />
                    <label htmlFor="friday">F</label>
                    <input onChange={(e) => setDay6(e.target.checked)} type="checkbox" name="daysOfWeek" id="friday" value={day6} />
                    <label htmlFor="saturday">S</label>
                    <input onChange={(e) => setDay7(e.target.checked)} type="checkbox" name="daysOfWeek" id="saturday" value={day7} />
                </fieldset>

                {/* <fieldset>
                    <label htmlFor="numeric">Numeric</label>
                    <input type="checkbox" name="numeric" id="numeric" onChange={() => setNumeric(!numeric)} />

                    {
                        (numeric) ?
                            <fieldset>
                                <label htmlFor="routineGoal"></label>
                                <input type="number" name="routineGoal" id="routineGoal" />
                                <label htmlFor="units">Units (Optional)</label>
                                <input type="text" name="units" id="units" />
                            </fieldset>
                            : null

                    }
                </fieldset> */}

                <button>Add Routine</button>
            </form>

        </div>
    )
}

export default AddRoutine;
