// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDvlg_NqoKCXztsv-sZBQ70G3cs5u1UbHs",
  authDomain: "todo-5b535.firebaseapp.com",
  projectId: "todo-5b535",
  storageBucket: "todo-5b535.appspot.com",
  messagingSenderId: "549177573010",
  appId: "1:549177573010:web:b334d10af697e5ee58b04b",
  measurementId: "G-ZQN5PWM2G4"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//access database through getFireStore
export const db = getFirestore(app)