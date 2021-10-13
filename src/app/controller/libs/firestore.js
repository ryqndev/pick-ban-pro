import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyBN3STG3gD2pud9bepRXgxvgfrSr-h_PBU",
    authDomain: "pickbanpro.firebaseapp.com",
    projectId: "pickbanpro",
    storageBucket: "pickbanpro.appspot.com",
    messagingSenderId: "215885574991",
    appId: "1:215885574991:web:c7d4a84aa1be3d72e40b3a"
};

const firebaseApp = initializeApp(config);
const db = getFirestore();


// @TODO - remove below in prod
// use emulator
connectFirestoreEmulator(db, 'localhost', 8080);

export default db;


