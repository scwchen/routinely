// Components and Modules
import { useEffect, useState } from 'react';
import realtime from './firebase.js';
import { ref, onValue, push, remove } from 'firebase/database';

// Stylings
import './App.scss';

function App() {

  return (
    <div className="App">
      <h1>Solo React Project!</h1>
      <p>Testing font size and SASS</p>
    </div>
  );
}

export default App;
