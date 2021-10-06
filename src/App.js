// Components and Modules
import { useEffect, useState } from 'react';
import realtime from './firebase.js';
import { ref, onValue } from 'firebase/database';
import deleteRoutine from './Functions/deleteRoutine.js';
import DateSelect from './Components/DateSelect.js';
import AddRoutine from './Components/AddRoutine.js';
import DailyChecks from './Components/DailyChecks.js';


// Stylings
import './App.scss';

function App() {

  const today = new Date();

  // const [selectedDay, setSelectedDay] = useState(today.getDay());

  const [routineList, setRoutineList] = useState([]);

  const [addRoutineOpen, setaddRoutineOpen] = useState(false);

  // const [routineFrequency, setRoutineFrequency] = useState([]);

  // Running this useEffect only when the component mounts
  useEffect(() => {
    const dbRef = ref(realtime);

    // We grab a snapshot of our database and use the .val method to parse the JSON object that is our database data out of it
    onValue(dbRef, (snapshot) => {

      const myRoutines = snapshot.val();
      // Have to go down one level further 

      const newRoutineArray = [];

      for (let propName in myRoutines) {
        const routineItem = {
          key: propName,
          routine: myRoutines[propName]
        };

        newRoutineArray.push(routineItem);
      };

      setRoutineList(newRoutineArray);

    });

  }, []); // end of useEffect

  const selectDate = (selectedDate) => {
    // setSelectedDay(selectedDate.value);
    // console.log(selectedDay);

  };

  const routineModal = () => {
    setaddRoutineOpen(!addRoutineOpen);
  }


  return (
    <div className="App">
      <div className="wrapper">

        <header>
          <h1>Routinely</h1>
        </header>
        <main>

          <div className="dateSelect">
            <div className="dates">
              <DateSelect
                selectDate={selectDate}
                today={today} />

            </div>
          </div>
          <ul className="routineContainer">


            {/* Modal for Adding Routines */}
            {addRoutineOpen && <AddRoutine modalToggle={routineModal} />}

            {/* Button to Add a new routine */}
            <li className="addButton">
              <button onClick={routineModal}>+</button>
            </li>

            {
              routineList.map((individualRoutine) => {
                const { key, routine } = individualRoutine

                return (
                  <li key={key} className="routineItem">


                    {/* <input type="checkbox" id={key} /> */}
                    {/* <label htmlFor={key}>{routine.routineName}</label> */}

                    <div className="routineName">
                      <p>{routine.routineName}</p>

                    </div>

                    <div className="routineDetails">
                      <DailyChecks freq={routine.frequency} />
                    </div>
                    <div className="editButton">

                      <button onClick={() => deleteRoutine(key)}><i className="far fa-trash-alt"></i></button>
                    </div>


                  </li>

                )
              })

            }




          </ul>

        </main>
        <footer>
          <p>Created by
            <a href="https://github.com/scwchen" target="_blank" rel="noreferrer"> Steven Chen at</a>
            <a href="https://junocollege.com/" target="_blank" rel="noreferrer"> Juno College</a> 2021
          </p>
        </footer>
      </div> {/* end of wrapper */}

    </div>
  );
}

export default App;
