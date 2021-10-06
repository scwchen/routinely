// Components and Modules
import { useEffect, useState } from 'react';
import realtime from './firebase.js';
import { ref, onValue, remove } from 'firebase/database';
import DateSelect from './Components/DateSelect.js';
import AddRoutine from './Components/AddRoutine.js';

// Stylings
import './App.scss';

function App() {

  const today = new Date();

  const [selectedDay, setSelectedDay] = useState(today.getDay());

  const [routineList, setRoutineList] = useState([]);

  const [addRoutineOpen, setaddRoutineOpen] = useState(false);


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


  const showDate = () => {

    let dayCounter = new Date();

    dayCounter.setDate(today.getDate() - today.getDay());

    const weekdays = [];

    for (let i = 0; i < 7; i++) {
      // formatting to string and removing the year portion of the date
      const dateString = dayCounter.toDateString().slice(0, -5);
      let chosenDate = '';

      if (dayCounter.getDate() === today.getDate()) {
        chosenDate = ' chosenDate';
      }

      weekdays.push({ dateString, chosenDate });

      dayCounter.setDate(dayCounter.getDate() + 1);
    }

    return weekdays;
  };

  const selectDate = (selectedDate) => {
    setSelectedDay(selectedDate.value);
    console.log(selectedDay);
    // would have to remove the class for each first, maybe a useEffect?
  };

  const routineModal = () => {
    setaddRoutineOpen(!addRoutineOpen);
  }

  const removeRoutine = (specificNodeKey) => {
    const specificNodeRef = ref(realtime, specificNodeKey);


    console.log(specificNodeRef);
    remove(specificNodeRef);
  };

  return (
    <div className="App">
      <div className="wrapper">

        <header>
          <h1>Routinely</h1>
        </header>
        <main>

          <ul className="dateSelect">
            <DateSelect 
            selectDate={selectDate}
            showDate={showDate}/>
          </ul>
          <ul className="routineContainer">
            <li>
              <button onClick={routineModal}>+</button>
              {addRoutineOpen && <AddRoutine modalToggle={routineModal} />}
            </li>
            <li>
              <form>
            {
              routineList.map((individualRoutine) => {
                const { key, routine } = individualRoutine

                return (
                  <li key={key}>

                    <input type="checkbox" id={key} />
                    <label htmlFor={key}>{routine.routineName}</label>
                    <button onClick={()=>removeRoutine(key)}>X</button>


                  </li>

                )
              })

            }

              </form>

            </li>
            


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
