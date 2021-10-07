// Components and Modules
import { useEffect, useState } from 'react';
import realtime from './firebase.js';
import { ref, onValue, remove } from 'firebase/database';
import DateSelect from './Components/DateSelect.js';
import AddRoutine from './Components/AddRoutine.js';
import DailyChecks from './Components/DailyChecks.js';
import ConfirmDelete from './Components/ConfirmDelete.js';


// Stylings
import './App.scss';

function App() {

  const [routineList, setRoutineList] = useState([]);

  const [addRoutineOpen, setAddRoutineOpen] = useState(false);
  const [deleteRoutineOpen, setDeleteRoutineOpen] = useState(false);
  const [toDelete, setToDelete] = useState('');

  // const [toComplete, setToComplete] = useState('');

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


  // Function to delete routine from the database
  const deleteRoutine = () => {
    const specificNodeRef = ref(realtime, toDelete);

    remove(specificNodeRef);

    delModal();
  };

  // Modal open and close functions
  const addModal = () => {
    setAddRoutineOpen(!addRoutineOpen);
  }

  const delModal = () => {
    setDeleteRoutineOpen(!deleteRoutineOpen);
  }

  return (
    <div className="App">
      <div className="wrapper">

        <header>
          <h1>Routinely</h1>
          <h2>Make it a habit</h2>
        </header>
        <main>

          {addRoutineOpen && <AddRoutine modalToggle={addModal} />}
          {deleteRoutineOpen && <ConfirmDelete modalToggle={delModal} deleteRoutine={deleteRoutine} />}

          <section className="routineContainer">


            {/* Button to Add a new routine */}
            <div className="addButton">
              <button onClick={addModal}>+</button>
            </div>

            {
              routineList.length === 0 ?

                <p className="prompt">Start with just one habit</p>
                :
                <div className="dateSelect">
                  <div className="dates">
                    <DateSelect />

                  </div>
                </div>
            }


            {
              routineList.map((individualRoutine) => {
                const { key, routine } = individualRoutine;

                // console.log(individualRoutine);
                return (
                  <div key={key} className="routineItem">

                    <div className="routineName">
                      <p>{routine.routineName}</p>
                    </div>

                    <div className="routineDetails">
                      <DailyChecks
                        freq={routine.frequency}
                        completed={routine.completed} />
                    </div>


                    {/* Adding a delete button for each routine */}
                    <div className="delButton">

                      <button value={toDelete} onClick={() => {
                        delModal();
                        setToDelete(key);

                      }}><i className="far fa-trash-alt"></i></button>

                    </div>


                  </div>

                )
              })

            }

          </section> {/* end of routineContainer */}

        </main> {/* end of main */}
      </div> {/* end of wrapper */}

      <footer>
        <p>Created by
          <a href="https://github.com/scwchen" target="_blank" rel="noreferrer"> Steven Chen </a>
          at
          <a href="https://junocollege.com/" target="_blank" rel="noreferrer"> Juno College</a> 2021
        </p>
      </footer>
    </div>
  );
}

export default App;
