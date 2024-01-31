// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged, // Add this import
} from 'firebase/auth';

const firebaseConfig = {
  // apiKey: 'AIzaSyDu-H4v25kASDVsFZmR3VdwoDrgl29Q6vI',
  // authDomain: 'luxurylodge-88660.firebaseapp.com',
  // projectId: 'luxurylodge-88660',
  // storageBucket: 'luxurylodge-88660.appspot.com',
  // messagingSenderId: '520789226319',
  // appId: '1:520789226319:web:8b25168cbdf541b7158b3a',


  apiKey: "AIzaSyDKUv3zRcbnYY4tYNl5kibNwzJkJUhji4Q",
  authDomain: "bookingapp-fd44d.firebaseapp.com",
  projectId: "bookingapp-fd44d",
  storageBucket: "bookingapp-fd44d.appspot.com",
  messagingSenderId: "716584717713",
  appId: "1:716584717713:web:12bd21d05d3acde5175e30",
  measurementId: "G-PRLG7XGLYZ"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

export {
  firebaseApp,
  firestore,
  storage,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged, // Add this export
};

