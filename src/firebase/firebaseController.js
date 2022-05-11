import{auth, provider, signInWithPopup, signOut} from '../firebase/firebase.js'

export function loginGoogle() {
return signInWithPopup(auth, provider)
}

export function cerrarSesion() {
    return signOut(auth);
  }