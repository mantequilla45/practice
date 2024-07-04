import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCARqj63rFsROKWPN8BVumvPnVWxnruqJA",
  authDomain: "bsdoc-d4e34.firebaseapp.com",
  projectId: "bsdoc-d4e34",
  storageBucket: "bsdoc-d4e34.appspot.com",
  messagingSenderId: "906392557137",
  appId: "1:906392557137:web:750331cac669aee920ca70",
  measurementId: "G-TJ3P00J1N6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };