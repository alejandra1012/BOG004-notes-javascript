import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  doc,
  serverTimestamp,
  deleteDoc,
} from '../firebase/firebase.js';

export function loginGoogle() {
  return signInWithPopup(auth, provider);
}

export function cerrarSesion() {
  return signOut(auth);
}

export function observador() {
  return onAuthStateChanged(auth, (user) => {
    if (user === null || user === undefined) {
      window.location.hash = '#/inicioSesion';
    } else {
      window.location.hash = '#/notas';
    }
  });
}

export const currentUser = () => {
  observador();
  const user = auth.currentUser;
  if (user === null || user === undefined) {
    window.location.hash = '#/inicioSesion';
  } else {
    window.location.hash = '#/notas';
  }
  return user;
};

const dbNotas = collection(db, 'Notas');

export function crearNota(noteDescription, uid, email) {
  return addDoc(dbNotas, {
    noteDescription,
    email,
    uid,
    noteCreatedAt: serverTimestamp(),
  });
}
console.log(dbNotas);

export function getNote() {
  return getDocs(dbNotas);
}

const notaOrganizada = query(dbNotas, orderBy('noteCreatedAt', 'desc'));

export function readAllNotes(querySnapshot) {
  return onSnapshot(notaOrganizada, querySnapshot);
}

export function borrarNotas(id) {
  return deleteDoc(doc(dbNotas, id));
}
