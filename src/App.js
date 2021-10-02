// Components and Modules
import { useEffect, useState } from 'react';
import realtime from './firebase.js';
import { ref, onValue, push, remove } from 'firebase/database';

// Stylings
import './App.scss';

function App() {

  const [routineList, setRoutineList] = useState([]);
  const [userRoutine, setUserRoutine] = useState({});

  // Running this useEffect only when the component mounts
  useEffect(() => {
    const dbRef = ref(realtime);


    // We grab a snapshot of our database and use the .val method to parse the JSON object that is our database data out of it
    onValue(dbRef, (snapshot) => {

      const myRoutines = snapshot.val();
      // Have to go down one level further 

      const newRoutineArray = [];

      for (let propName in myRoutines) {
        const newRoutine = {
          key: propName,
          routineName: myRoutines[propName]
        };

        newRoutineArray.push(newRoutine);
      };

      setRoutineList(newRoutineArray);

    });

  }, []);

  return (
    <div className="App">
      <h1>Solo React Project!</h1>
      <ul>
        {
          routineList.map((individualRoutine) => {
            return (
              <li key={individualRoutine.key}>
                <p>Test</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
