import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyALff-CUuxDdhHjRcWt6dfqYmhmTiB84xY',
  authDomain: 'lab-notes-ln1.firebaseapp.com',
  projectId: 'lab-notes-ln1',
  storageBucket: 'lab-notes-ln1.appspot.com',
  messagingSenderId: '322022327639',
  appId: '1:322022327639:web:17e48b43a42c0eb059ea12',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  collection, 
  addDoc, 
  getDocs, 
  serverTimestamp, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  deleteDoc };
