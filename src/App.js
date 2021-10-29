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

  const [menuOpen, setMenuOpen] = useState(false);
  // Running this useEffect only when the component mounts
  useEffect(() => {

    if (user !== '') {
      const dbRef = ref(realtime, user);
      setLoggedOut(false);
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
    setMenuOpen(false);
  };

  // ===========================================
  // Handling the settings button click to open settings menu
  // ===========================================
  const handleSettingsClick = () => {
    setMenuOpen(!menuOpen);
  };

  // Main Return
  return (

    <div className="App">

      {/* Widgets and Modals */}

      {/* Adding the Add and Delete modals but only rendering when needed */}
      {addRoutineOpen && <AddRoutine
        modalToggle={addModal}
        user={user}
      />}
      {deleteRoutineOpen && <ConfirmDelete modalToggle={delModal} deleteRoutine={deleteRoutine} />}

      {/* Side menu for user settings - will want to refactor into separate component */}
      <div className={`side-menu ${menuOpen ? 'open' : ''} ${user === '' ? 'hidden' : ''}`}>
        <button className={`open-menu ${menuOpen ? 'hidden' : ''}`} onClick={handleSettingsClick} aria-label="Open user settings" title="Open user settings"><i className="fas fa-cog"></i></button>
        <button className="close-menu" onClick={handleSettingsClick} aria-label="Close user settings" title="Close user settings"><i className="fas fa-chevron-left"></i></button>
        <div className="user-settings">
          <h4>Username:</h4>
          <p>{userEmail ? userEmail : null}</p>

          <button className="user-logout setting-button" onClick={userLogout}>Log Out</button>
          <button className="more-info setting-button" onClick={toggleDescription}>
            Show Descriptions
          </button>
        </div>
      </div>



      {/* End of Widgets and Modals */}

      <div className="wrapper">

        <header>
          <h1>Routinely</h1>
          <h2>Make it a habit</h2>
        </header>
        <main>

          {
            loggedOut === false ?

              <div className="routine-container">






                {/* Button to Add a new routine */}

                <button className="add-button" onClick={addModal} aria-label="Add a routine"><i className="fas fa-plus"></i></button>



                {
                  routineList.length === 0 ?
                    <div className="prompt-container">
                      <p className="prompt">Start with just one habit</p>
                      <p className="prompt">Click below to begin adding</p>
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
                          <div className="del-button-container">

                            <button className="del-button" value={toDelete} onClick={() => {
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
    </div >     //  end of App 


  );
}

export default App;
