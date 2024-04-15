import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyB_d5O2L631GW8WLTK7rzizLTkDaUFe__A",
  authDomain: "agri-365.firebaseapp.com",
  projectId: "agri-365",
  storageBucket: "agri-365.appspot.com",
  messagingSenderId: "242744388593",
  appId: "1:242744388593:web:0a5601fc9da3918bdff250",
  measurementId: "G-0MD5CP2944"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };