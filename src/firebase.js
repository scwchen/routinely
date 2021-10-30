// Import the function to configure and intitialize our firebase app
import { initializeApp } from 'firebase/app';

// Import the function to pull in the Firebase realtime database service.
import { getDatabase } from 'firebase/database';

// Import the function for email/password authorization
import { getAuth } from 'firebase/auth';

// Routinely - Web app firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL ,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ,
    appId: process.env.REACT_APP_FIREBASE_APP_ID ,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase authentication
export const auth = getAuth(app);

// Go get the realtime database service
const realtime = getDatabase(app);

export default realtime;