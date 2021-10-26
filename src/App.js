// Components and Modules
import { useEffect, useState } from 'react';
import { ref, onValue, update, remove } from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

import realtime from './firebase.js';
import { auth } from './firebase.js';
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
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  // Setting up user states for authentication
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const [user, setUser] = useState({});

  // Running this useEffect only when the component mounts
  useEffect(() => {
    const dbRef = ref(realtime);

    // We grab a snapshot of our database and use the .val method to parse the JSON object that is our database data out of it
    onValue(dbRef, (snapshot) => {

      const myRoutines = snapshot.val();

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


  // ===========================================
  // Function to delete routine from the database
  // ===========================================
  const deleteRoutine = () => {
    const specificNodeRef = ref(realtime, toDelete);

    remove(specificNodeRef);

    delModal();
  };

  // ===========================================
  // Function to update the routine in the database with completions
  // ===========================================
  const updateRoutine = (completed, refID) => {
    const specificNodeRef = ref(realtime, refID);

    const newCompleted = {
      completed: completed
    }

    update(specificNodeRef, newCompleted);

  };


  // ===========================================
  // Modal open and close functions
  // ===========================================
  const addModal = () => {
    setAddRoutineOpen(!addRoutineOpen);
  }

  const delModal = () => {
    setDeleteRoutineOpen(!deleteRoutineOpen);
  }

  // ===========================================
  // Toggle the description open and closed
  // ===========================================
  const toggleDescription = () => {
    setDescriptionOpen(!descriptionOpen);
  };

  return (
    <div className="App">
      <div className="wrapper">

        <header>
          <h1>Routinely</h1>
          <h2>Make it a habit</h2>
        </header>
        <main>



          {/* Adding the Add and Delete modals but only rendering when needed */}
          {addRoutineOpen && <AddRoutine modalToggle={addModal} />}
          {deleteRoutineOpen && <ConfirmDelete modalToggle={delModal} deleteRoutine={deleteRoutine} />}

          <section className="routineContainer">

            {/* Button to Add a new routine */}
            <div className="addButton">
              <button onClick={addModal}><i className="fas fa-plus"></i></button>
            </div>

            {/* Debating whether I should use a button or not */}
            <button className="moreInfo" onClick={toggleDescription}>
              <i className="fas fa-info"></i>
            </button>

            {
              routineList.length === 0 ?
                <div className="promptContainer">
                  <p className="prompt">Start with just one habit</p>
                </div>
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

                return (
                  <div key={key} className="routineItem">

                    <div className="routineDetails">
                      <div className="routineName">
                        <p >{routine.routineName}</p>
                      </div>

                      <div className="routineChecks">
                        {/* Adding the checkboxes for each date */}
                        <DailyChecks
                          freq={routine.frequency}
                          completed={routine.completed}
                          routineID={key}
                          updateRoutine={updateRoutine} />
                      </div>


                      {/* Adding a delete button for each routine */}
                      <div className="delButton">

                        <button value={toDelete} onClick={() => {
                          delModal();
                          setToDelete(key);

                        }}><i className="far fa-trash-alt"></i></button>

                      </div>
                    </div>

                    {/* Toggle descriptions  */}
                    {descriptionOpen === true &&
                      <div className="routineDescription">
                        <p>Description: {routine.description}</p>
                      </div>}

                  </div> // end of routineItem
                  

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
    </div> // end of App

  );
}

export default App;
