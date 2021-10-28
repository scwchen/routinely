// Components and Modules
import { useEffect, useState } from 'react';
import { ref, onValue, update, remove } from 'firebase/database';
import { auth } from './firebase.js';
import { signOut } from 'firebase/auth';
import realtime from './firebase.js';

import DateSelect from './Components/DateSelect.js';
import AddRoutine from './Components/AddRoutine.js';
import DailyChecks from './Components/DailyChecks.js';
import ConfirmDelete from './Components/ConfirmDelete.js';
import Footer from './Components/Footer';

// Stylings
import './App.scss';
import Login from './Components/Login.js';

function App() {

  const [routineList, setRoutineList] = useState([]);

  const [addRoutineOpen, setAddRoutineOpen] = useState(false);
  const [deleteRoutineOpen, setDeleteRoutineOpen] = useState(false);
  const [toDelete, setToDelete] = useState('');
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  const [user, setUser] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loggedOut, setLoggedOut] = useState(true);

  // Running this useEffect only when the component mounts
  useEffect(() => {

    if (user !== '') {
      const dbRef = ref(realtime, user);
      setLoggedOut(false);
      // We grab a snapshot of our database and use the .val method to parse the JSON object that is our database data out of it
      onValue(dbRef, (snapshot) => {
        const myRoutines = snapshot.val();
        console.log(myRoutines);

        const newRoutineArray = [];

        for (let propName in myRoutines) {
          const routineItem = {
            key: propName,
            routine: myRoutines[propName]
          };

          newRoutineArray.push(routineItem);
        };

        // console.log(newRoutineArray);
        setRoutineList(newRoutineArray);

      });
    }

  }, [user]); // end of useEffect


  // ===========================================
  // Function to delete routine from the database
  // ===========================================
  const deleteRoutine = () => {
    if (user !== '') {
      const specificNodeRef = ref(realtime, `${user}/${toDelete}`);

      remove(specificNodeRef);

      delModal();
    }
  };

  // ===========================================
  // Function to update the routine in the database with completions
  // ===========================================
  const updateRoutine = (completed, refID) => {
    if (user !== '') {
      const specificNodeRef = ref(realtime, `${user}/${refID}`);

      const newCompleted = {
        completed: completed
      }

      update(specificNodeRef, newCompleted);
    }

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


  // ===========================================
  // Logging user out
  // ===========================================
  const userLogout = async () => {
    await signOut(auth);
    setUser('');
    setUserEmail('');
    setLoggedOut(true);
  };


  // Main Return
  return (

    <div className="App">
      <div className="wrapper">

        <header>
          <h1>Routinely</h1>
          <h2>Make it a habit</h2>
        </header>
        <main>

          {
            loggedOut === false ?

              <div className="routine-container">
                {/* Adding the Add and Delete modals but only rendering when needed */}
                {addRoutineOpen && <AddRoutine
                  modalToggle={addModal}
                  user={user}
                />}
                {deleteRoutineOpen && <ConfirmDelete modalToggle={delModal} deleteRoutine={deleteRoutine} />}

                <div className="user-status">
                  <p>User: {userEmail ? userEmail : null}</p>
                  <button onClick={userLogout}>Log Out</button>
                </div>

                {/* Button to Add a new routine */}
                <div className="add-button">
                  <button onClick={addModal}><i className="fas fa-plus"></i></button>
                </div>

                {/* Debating whether I should use a button or not */}
                <button className="more-info" onClick={toggleDescription}>
                  <i className="fas fa-info"></i>
                </button>

                {
                  routineList.length === 0 ?
                    <div className="prompt-container">
                      <p className="prompt">Start with just one habit</p>
                    </div>
                    :
                    <div className="date-select">
                      <div className="dates">
                        <DateSelect />
                      </div>
                    </div>
                }


                {
                  routineList.map((individualRoutine) => {
                    const { key, routine } = individualRoutine;

                    return (
                      <div key={key} className="routine-item">

                        <div className="routine-details">
                          <div className="routine-name">
                            <p >{routine.routineName}</p>
                          </div>

                          <div className="routine-checks">
                            {/* Adding the checkboxes for each date */}
                            <DailyChecks
                              freq={routine.frequency}
                              completed={routine.completed}
                              routineID={key}
                              updateRoutine={updateRoutine} />
                          </div>


                          {/* Adding a delete button for each routine */}
                          <div className="del-button">

                            <button value={toDelete} onClick={() => {
                              delModal();
                              setToDelete(key);

                            }}><i className="far fa-trash-alt"></i></button>

                          </div>
                        </div>

                        {/* Toggle descriptions  */}
                        {descriptionOpen === true &&
                          <div className="routine-description">
                            <p>Description: {routine.description}</p>
                          </div>}

                      </div> // end of routineItem


                    )
                  })

                }

              </div>
              // end of routineContainer 
              :
              <Login
                setUser={setUser}
                setUserEmail={setUserEmail}
                setLoggedOut={setLoggedOut}
                auth={auth}
                signOut={signOut}
              />
          }

        </main> {/* end of main */}

      </div> {/* end of wrapper */}

      <Footer />
    </div>     //  end of App 


  );
}

export default App;
