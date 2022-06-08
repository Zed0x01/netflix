// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9dPqCm_mvgUThtEsFRC1evZkDi89chDM",
  authDomain: "netflix-next-3013e.firebaseapp.com",
  projectId: "netflix-next-3013e",
  storageBucket: "netflix-next-3013e.appspot.com",
  messagingSenderId: "20984436226",
  appId: "1:20984436226:web:8792bc9c99a20e5dfff91b",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
export default app;
export { auth, db };
