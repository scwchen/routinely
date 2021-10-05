// Components and Modules
import { useEffect, useState } from 'react';
import realtime from './firebase.js';
import { ref, onValue, remove } from 'firebase/database';
import AddRoutine from './Components/AddRoutine.js';
import DateSelect from './Components/DateSelect.js';
// Stylings
import './App.scss';

function App() {

  const [routineList, setRoutineList] = useState([]);
  const [userRoutine, setUserRoutine] = useState({});

  const [modalOpen, setModalOpen] = useState(false);

  const [chosenClass, setChosenClass] = useState('');




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
            <DateSelect />
          </ul>
          <ul className="routineContainer">
            <li>
              <button onClick={() => setModalOpen(!modalOpen)}>+</button>
              {modalOpen && <AddRoutine
                modalChange={setModalOpen}
                modalStatus={modalOpen}
              />}
            </li>
            {/* filter and then map depending on the day */}
            {
              routineList.map((individualRoutine) => {
                const { key, routine } = individualRoutine

                return (
                  <li key={key}>

                    <input type="checkbox" id={key} />
                    <label htmlFor={key}>{routine.routineName}</label>
                    <button onClick={() => removeRoutine(key)}>...</button>

                  </li>

                )
              })
            }

          </ul>
        </main>
        <footer>
          <p>Created by
            <a href="https://github.com/scwchen" target="_blank"> Steven Chen at</a>
            <a href="https://junocollege.com/" target="_blank"> Juno College</a> 2021
          </p>
        </footer>
      </div> {/* end of wrapper */}

    </div>
  );
}

export default App;
