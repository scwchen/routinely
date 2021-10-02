// Import the function to configure and intitialize our firebase app
import { initializeApp } from 'firebase/app';

// Import the function to pull in the Firebase realtime database service.
import { getDatabase } from 'firebase/database';

// Routinely - Web app firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKtbWGP_3j-_PWaw1pLoJfe07mLNLKCdY",
    authDomain: "routinely-84e52.firebaseapp.com",
    databaseURL: "https://routinely-84e52-default-rtdb.firebaseio.com",
    projectId: "routinely-84e52",
    storageBucket: "routinely-84e52.appspot.com",
    messagingSenderId: "250246006691",
    appId: "1:250246006691:web:fe942b9b69b37fcef47c16"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Go get the realtime database service
const realtime = getDatabase(app);

export default realtime;